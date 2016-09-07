var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');

const GO_BACK_EVENT = 'go-back';
const SIZE_CHANGE_EVENT = 'size-change';
const CHANGE_EVENT = 'change';
var state = {
    hasParent: false,
    items: [],
    openSubMenu: null,
    open: false
}

class WSDropdownMenu extends HTMLElement {
    // Use createdCallback instead of constructor to init an element.
    createdCallback() {
        this.rootTemplate = template.content.getElementById('ws-dropdown-menu').content;
        let clone = document.importNode(this.rootTemplate, true);

        // This element uses Shadow DOM.
        this.appendChild(clone);

        this.state = state;
        this.grabElements();
        this.getAttributes();
        this.setupListeners();
    }

    grabElements() {
        this.menuContainer = this.querySelector('.dropdown-menu');
    }

    draw() {
        let {hasParent, items} = this.state;
        this.cleanListItems();
        this.checkIfRoot(hasParent, items);
        this.addItems(items);
    }

    getAttributes() {
        try {
            let itemsAttributeValue = this.getAttribute('items');
            let hasParentAttribute = this.getAttribute('has-parent');
            this.state = Object.assign({}, this.state, {
                items: itemsAttributeValue && JSON.parse(itemsAttributeValue),
                hasParent: hasParentAttribute ? JSON.parse(hasParentAttribute) : false
            });

            // if attributes change redraw
            this.draw();
        } catch (e) {
            let message = `Getting Attributes failed: ${e.message}`;
            this.propagateError(message);
        }
    }

    setupListeners() {
        this.menuContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    get height() {
        return this.menuContainer.clientHeight;
    }

    checkIfRoot(hasParent, items) {
        let classes = 'dropdown-menu';
        if (!hasParent) {
            classes += ' dropdown-root-menu';
        } else {
            let goBackItem = document.importNode(this.rootTemplate.getElementById('ws-dropdown-menu-back-item').content, true).querySelector('li');
            goBackItem.addEventListener('click', () => this.propagateGoBack());
            this.menuContainer.appendChild(goBackItem);
        }
        this.menuContainer.className = classes;
    }

    addItems(items) {
        if (!items) {
            return;
        }
        items.forEach(item => {
            let listItem = this.prepareListItem(item);
            this.menuContainer.appendChild(listItem);
        });
    }

    cleanListItems() {
        this.menuContainer.innerHTML = '';
    }

    prepareListItem(item) {
        let classes = 'dropdown-menu';
        let listItem = document.importNode(this.rootTemplate.getElementById('ws-dropdown-menu-item').content, true);
        let linkItem = listItem.querySelector('a');
        let {selected, href, icon, label, children} = item;


        if (selected) {
            classes += ' is-active';
        }
        listItem.className = classes;

        if (icon) {
            let iconItem = document.createElement("i");
            iconItem.className = `icon ${icon}`;
            linkItem.appendChild(iconItem)
        }

        linkItem.textContent = label || item;

        let subMenuItem = listItem.querySelector('ws-dropdown-menu');
        if (children && children.length > 0) {
            subMenuItem.setAttribute('items', JSON.stringify(children));
            subMenuItem.setAttribute('has-parent', true);
            this.setupSubmenuListeners(subMenuItem);
        } else {
            subMenuItem.remove();
        }

        // having a link and an item is not desired
        if (href) {
            linkItem.setAttribute('href', href);
        } else {
            linkItem.addEventListener('click', () => this.next(item, subMenuItem));
        }

        return listItem;
    }

    next(item, subMenu) {
        // Show next menu if children are available
        if (item.children && item.children.length) {
            this.state.openSubMenu = subMenu;
            this.propagateNewMenuSize(subMenu.height);
            this.animateOut();
            subMenu.animateIn();
        }
        else if (item) {
            this.propagateChange(item);
        }
        else {
            this.propagateClick(item);
        }
        return false;
    }

    back() {
        if (this.state.openSubMenu) {
            this.state.openSubMenu.animateOut(this.state.openSubMenu.state.hasParent);
            this.propagateNewMenuSize(this.height);
            this.animateIn(this.state.hasParent);
            this.state.openSubMenu = null;
        }
    }

    animateIn(goBack) {
        this.state.open = true;
        let inAnimation = goBack ? 'animate-in' : 'animate-sub-in';
        // Create a clone of new sub menu for animations
        this.animateElement(this.menuContainer, inAnimation, menu => {
            menu.classList.remove('mod-sub-open');
            menu.classList.add('mod-menu-open');
        });
    }

    animateOut(goBack) {
        this.state.open = false;
        let outAnimation = !goBack ? 'animate-out' : 'animate-sub-out';
        // Fade out old element and set mod-item-open if going back and mod-sub-open for going deeper
        this.animateElement(this.menuContainer, outAnimation, menu => {
            menu.classList.remove('mod-menu-open');
            if (!goBack) {
                menu.classList.add('mod-sub-open');
            }
        });
    }

    animateElement(item, animationClass, callback) {
        // Define callback for animation end events
        let getHandler = eventName => {
            let handler = event => {
                item.classList.remove(animationClass);
                item.removeEventListener(eventName, handler);
                callback(item);
            };
            return handler;
        };
        // Listen for all possible animation end events
        for (let eventName of animationEndEvents) {
            item.addEventListener(eventName, getHandler(eventName));
        }
        // Add class to start animation
        item.classList.add(animationClass);
    }

    close() {
        this.menuContainer.classList.remove('mod-sub-open');
        this.menuContainer.classList.remove('mod-menu-open');
        if (!!this.state.openSubMenu) {
            this.state.openSubMenu.close();
        }
    }

    setupSubmenuListeners(subMenuElement) {
        subMenuElement.addEventListener(GO_BACK_EVENT, (e) => {
            e.preventDefault();
            this.back();
        });
        subMenuElement.addEventListener(CHANGE_EVENT, (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.propagateChange(e.detail.item);
        });
    }

    propagateGoBack() {
        let event = new CustomEvent(GO_BACK_EVENT);
        this.dispatchEvent(event);
    }

    propagateNewMenuSize(newSize) {
        let event = new CustomEvent(SIZE_CHANGE_EVENT, {
            detail: {
                menuSize: newSize
            }
        });
        this.dispatchEvent(event);
    }

    propagateError(reason) {
        let event = new CustomEvent("error", {
            detail: {
                message: reason
            }
        });
        this.dispatchEvent(event);
    }

    propagateChange(item) {
        let event = new CustomEvent(CHANGE_EVENT, {
            detail: {
                item
            }
        });
        this.dispatchEvent(event);
    }

    propagateClick(item) {
        let event = new CustomEvent('click', {
            detail: {
                item
            }
        });
        this.dispatchEvent(event);
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "items":
            case "has-parent":
                this.getAttributes();
                break;
        }
    };
}

//Register the element with the document
document.registerElement('ws-dropdown-menu', WSDropdownMenu);