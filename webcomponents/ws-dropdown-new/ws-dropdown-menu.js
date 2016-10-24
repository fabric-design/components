const rootTemplate = (document._currentScript || document.currentScript).ownerDocument.querySelector('template').content;
const menuTplElement = rootTemplate.getElementById('ws-dropdown-menu');
const menuItem = rootTemplate.getElementById('ws-dropdown-menu-item').content.querySelector('li');

class WSDropdownMenu extends HTMLElement {

    static ANIMATION_START_EVENTS = ['oAnimationStart', 'MSAnimationStart', 'animationstart'];
    static ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

    createdCallback() {
        let clone = document.importNode(menuTplElement.content, true);
        this.appendChild(clone);

        this.state = {};
    }

    attachedCallback() {
        this.grabElements();
        this.readAttributes();
        this.setupListeners();
    }

    grabElements() {
        this.menuContainer = this.querySelector('.dropdown-menu');
        // Get the elements which were via <content> projected as menu
        // nodeType 1 === ELEMENT_NODE, see http://www.w3schools.com/xml/dom_nodetype.asp
        let contentProjection = this.querySelector('#menu');
        if (contentProjection) {
            this.distributedNodes = Array.from(contentProjection.getDistributedNodes());
            this.menuProjection = this.distributedNodes.find(node => node.nodeType === 1 && node.classList.contains('dropdown-menu'));
            this.replaceChild(this.menuProjection, this.menuContainer);
        }
    }

    setupListeners() {
        this.menuContainer.addEventListener('click', event => {
            event.stopPropagation();
        });
        this.menuContainer.addEventListener('go-back', event => {
            event.stopPropagation();
            this.showParent();
        }, true)
    }

    draw() {
        if (this.menuProjection) {
            this.menuContainer = this.menuProjection;
            return;
        }
        this.menuContainer.innerHTML = '';
        if (!this.state.hasParent) {
            this.menuContainer.classList.add('dropdown-root-menu');
        }
        else {
            let backItem = this.createMenuItem({label: '‹ Back'}, 'back');
            this.menuContainer.appendChild(backItem);
            this.menuContainer.classList.remove('dropdown-root-menu');
        }

        (this.state.items || []).forEach(item => {
            let listItem = this.createMenuItem(item, 'next');
            this.menuContainer.appendChild(listItem);
        });
    }

    readAttributes() {
        this.state.hasParent = this.hasAttribute('has-parent');
        this.state.items = this.hasAttribute('items') && JSON.parse(this.getAttribute('items'));
        this.draw();
    }

    attributeChangedCallback(attrName) {
        switch (attrName) {
            case "items":
            case "has-parent":
                this.readAttributes();
                break;
        }
    };

    createMenuItem(item, action) {
        let node = document.importNode(menuItem, true);
        let menuNode = node.querySelector('ws-dropdown-menu');
        let anchorNode = node.querySelector('.text');
        anchorNode.textContent = item.label || item;

        if (item.selected) {
            anchorNode.classList.add('is-active');
        }

        if (item.icon) {
            let iconItem = document.createElement("i");
            iconItem.className = `icon ${item.icon}`;
            anchorNode.insertBefore(iconItem, anchorNode.firstChild);
        }

        if (item.href) {
            anchorNode.setAttribute('href', item.href);
        }
        else {
            anchorNode.addEventListener('click', () => this[action](item, menuNode));
        }

        if (item.children && item.children.length) {
            menuNode.setAttribute('items', JSON.stringify(item.children));
            menuNode.setAttribute('has-parent', true);
        }
        else {
            node.removeChild(menuNode);
        }

        return node;
    }

    get height() {
        return this.menuContainer.clientHeight;
    }

    next(item, subMenu) {
        // Show next menu if children are available
        if (item.children && item.children.length) {
            this.showChild(subMenu);
        }
        else if (item) {
            this.propagate('change', {item});
        }
        else {
            this.propagate('click', {item});
        }
        return false;
    }

    back() {
        // Call the parent menu to start back animation (sub out and main in)
        this.propagate('go-back');
    }

    close() {
        this.menuContainer.classList.remove('mod-sub-open', 'mod-menu-open');
        if (!!this.state.openSubMenu) {
            this.state.openSubMenu.close();
        }
    }

    showChild(subMenu) {
        this.state.openSubMenu = subMenu;
        this.propagate('change-size', {height: subMenu.height});
        this.animateOut();
        subMenu.animateIn();
    }

    showParent() {
        if (this.state.openSubMenu) {
            this.propagate('change-size', {height: this.height});
            this.state.openSubMenu.animateOut(true);
            this.animateIn(true);
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
        let eventCounter = 0;
        // Handler for animation end event
        let handler = event => {
            // Do nothing until all started events are done
            if (--eventCounter) {
                return;
            }
            // Remove all animation end event listeners from this item. They won't get called anymore
            for (let eventName of WSDropdownMenu.ANIMATION_END_EVENTS) {
                item.removeEventListener(eventName, handler);
            }
            item.classList.remove(animationClass);
            callback(item);
        };
        // Listen for all possible animation end events
        for (let eventName of WSDropdownMenu.ANIMATION_END_EVENTS) {
            item.addEventListener(eventName, handler);
        }
        // Increase started event counter for each animation start event
        for (let eventName of WSDropdownMenu.ANIMATION_START_EVENTS) {
            item.addEventListener(eventName, () => eventCounter++);
        }
        // Add class to start animation
        item.classList.add(animationClass);
    }

    propagate(eventName, detail) {
        let event = new CustomEvent(eventName, {detail});
        this.dispatchEvent(event);
    }
}

//Register the element with the document
document.registerElement('ws-dropdown-menu', WSDropdownMenu);