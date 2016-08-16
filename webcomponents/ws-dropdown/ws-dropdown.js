var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');

const GO_BACK_EVENT = 'go-back';
const GO_NEXT_EVENT = 'go-next';
var state = {
    items: [],
    value: null
}

var animationEndEvents = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

class WSDropdown extends HTMLElement {
    // Use createdCallback instead of constructor to init an element.
    createdCallback() {
        let clone = document.importNode(template.content.getElementById('ws-dropdown').content, true);

        // This element uses Shadow DOM.
        this.createShadowRoot().appendChild(clone);

        this.state = state;
        this.grabElements();
        this.getAttributes();
        this.draw();
    }

    grabElements() {
        this.dropdownContainer = this.shadowRoot.querySelector('.dropdown-container');
        this.dropdownMenu = this.shadowRoot.querySelector('ws-dropdown-menu');
    }

    getAttributes() {
        let itemsAttributeValue = this.getAttribute('items');
        this.state = Object.assign({}, this.state, {
            items: itemsAttributeValue && JSON.parse(itemsAttributeValue)
        });
    }

    draw() {
        this.dropdownMenu.setAttribute('items', JSON.stringify(this.state.items));
    }

    setupListeners(menuElement) {
        menuElement.on(GO_BACK_EVENT, (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.back(e);
        });
        menuElement.on(GO_NEXT_EVENT, (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.next(e);
        });
    }

    open() {
        if (!this.dropdownContainer.classList.contains('mod-open')) {
            this.dropdownContainer.style.height = 0;
            this.dropdownContainer.classList.add('mod-open');
        }
        this.adjustSize(this.currentMenu || this.dropdownMenu);
    }

    close() {
        if (this.dropdownContainer.classList.contains('mod-open')) {
            this.animateElement(this.dropdownContainer, 'animate-close', container => {
                container.classList.remove('mod-open');
            });
        }
    }

    next(event, element, item) {
        event.preventDefault();
        event.stopPropagation();
        // Show next menu if children are available
        if (item.children && item.children.length) {
            let oldMenu = this.currentMenu || this.dropdownMenu;
            let newMenu = element.querySelector('.dropdown-menu');
            this.adjustSize(newMenu);
            this.animate(oldMenu, newMenu, false);
            this.currentMenu = newMenu;
        }
        else if (item.value !== undefined) {
            this.value = item.value;
            this.events.publish('click', item);
            this.events.publish('change', {value: this.value});
        }
        else {
            this.events.publish('click', item);
        }
        return false;
    }

    back(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.currentMenu) {
            throw new Error('Can not go back in dropdown if already on root');
        }
        let oldMenu = this.currentMenu;
        let newMenu = this.getParent(this.currentMenu, 'dropdown-menu') || this.dropdownMenu;
        this.adjustSize(newMenu);
        this.animate(oldMenu, newMenu, true);
        this.currentMenu = newMenu;
    }

    adjustSize(newMenu) {
        this.dropdownContainer.style.height = newMenu.clientHeight + 'px';
    }

    animate(oldMenu, newMenu, goBack) {
        let outAnimation = !goBack ? 'animate-out' : 'animate-sub-out';
        let inAnimation = goBack ? 'animate-in' : 'animate-sub-in';
        // Fade out old element and set mod-item-open if going back and mod-sub-open for going deeper
        this.animateElement(oldMenu, outAnimation, menu => {
            menu.classList.remove('mod-menu-open');
            if (!goBack) {
                menu.classList.add('mod-sub-open');
            }
        });
        // Create a clone of new sub menu for animations
        this.animateElement(newMenu, inAnimation, menu => {
            menu.classList.remove('mod-sub-open');
            menu.classList.add('mod-menu-open');
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
        for (let eventName of this.animationEndEvents) {
            item.addEventListener(eventName, getHandler(eventName));
        }
        // Add class to start animation
        item.classList.add(animationClass);
    }

    getParent(item, className) {
        let parentItem = null;
        for (let e = item.parentNode; !parentItem; e = e.parentNode) {
            if (e.classList.contains(className)) {
                parentItem = e;
                break;
            }
            if (e.classList.contains('dropdown')) {
                break;
            }
        }
        return parentItem;
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
    attachedCallback() {
        this.adjustSize(this.dropdownMenu);
    }
    detachedCallback() { }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case 'items':
                this.getAttributes();
                this.draw();
                break;
        }
    };
}

//Register the element with the document
document.registerElement('ws-dropdown', WSDropdown);