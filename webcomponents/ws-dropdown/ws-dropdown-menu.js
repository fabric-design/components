var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');

const GO_BACK_EVENT = 'go-back';
const GO_NEXT_EVENT = 'go-next';
var state = {
    hasParent: false,
    items: []
}

class WSDropdownMenu extends HTMLElement {
    // Use createdCallback instead of constructor to init an element.
    createdCallback() {
        this.rootTemplate = template.content.getElementById('ws-dropdown-menu').content;
        let clone = document.importNode(this.rootTemplate, true);
        let styleElement = template.content.querySelector('style').cloneNode(true);

        // This element uses Shadow DOM.
        this.createShadowRoot().appendChild(clone);
        this.shadowRoot.appendChild(styleElement);

        this.state = state;
        this.grabElements();
        this.getAttributes();
    }

    grabElements() {
        this.menuContainer = this.shadowRoot.querySelector('.dropdown-menu');
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
            console.log(message);
            this.propagateError(message);
        }
    }

    checkIfRoot(hasParent, items) {
        let classes = 'dropdown-menu';
        if (!hasParent) {
            classes += ' dropdown-root-menu';
        } else {
            let goBackItem = document.importNode(this.rootTemplate.getElementById('ws-dropdown-menu-back-item').content);
            goBackItem.onclick = () => this.emitGoBackEvent();
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
        })
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
        linkItem.className = classes;

        // having a link and an item is not desired
        if (href) {
            linkItem.setAttribute('href', href);
        } else {
            linkItem.onclick = () => this.propagateGoNext(item);
        }

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
        } else {
            subMenuItem.remove();
        }

        return listItem;
    }

    setupListeners(listItemElement) {
        listItemElement.on(GO_BACK_EVENT, (e) => {
            e.preventDefault();
            this.propagateGoBack();
        });
        listItemElement.on(GO_NEXT_EVENT, (e) => {
            e.preventDefault();
            this.propagateGoNext(e.detail.item);
        });
    }

    propagateGoBack() {
        let event = new CustomEvent(GO_BACK_EVENT);
        this.dispatchEvent(event);
    }

    propagateGoNext(item) {
        let event = new CustomEvent(GO_NEXT_EVENT, {
            detail: {
                item: item
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

    // You can also define the other lifecycle methods.
    attachedCallback() { }
    detachedCallback() { }
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