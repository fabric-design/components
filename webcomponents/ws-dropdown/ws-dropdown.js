var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');

const SIZE_CHANGE_EVENT = 'size-change';
var state = {
    items: [],
    value: null
}

var animationEndEvents = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

class WSDropdown extends HTMLElement {
    // Use createdCallback instead of constructor to init an element.
    createdCallback() {
        let clone = document.importNode(template.content.getElementById('ws-dropdown').content, true);
        let styleElement = template.content.querySelector('style').cloneNode(true);

        // This element uses Shadow DOM.
        this.createShadowRoot().appendChild(clone);
        this.shadowRoot.appendChild(styleElement);

        this.state = state;
        this.grabElements();
        this.getAttributes();
        this.setupListeners(this.dropdownMenu);
        this.draw();
        this.adjustSize(this.dropdownMenu);
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
        menuElement.addEventListener(SIZE_CHANGE_EVENT, (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.adjustSize(e.detail.menuSize);
        });
        menuElement.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
        });
        menuElement.addEventListener('change', (e) => {
            e.stopPropagation();
            e.preventDefault();
        });
    }

    open() {
        if (!this.dropdownContainer.classList.contains('mod-open')) {
            this.dropdownContainer.style.height = 0;
            this.dropdownContainer.classList.add('mod-open');
            this.dropdownMenu.animateIn();
        }
        this.adjustSize(this.dropdownMenu.height);
    }

    close() {
        if (this.dropdownContainer.classList.contains('mod-open')) {
            this.animateElement(this.dropdownContainer, 'animate-close', container => {
                container.classList.remove('mod-open');
                this.dropdownMenu.close();
            });
        }
    }

    adjustSize(newSize) {
        this.dropdownContainer.style.height = newSize + 'px';
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
            case 'items':
                this.getAttributes();
                this.draw();
                break;
        }
    };
}

//Register the element with the document
document.registerElement('ws-dropdown', WSDropdown);