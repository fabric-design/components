var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');

const SIZE_CHANGE_EVENT = 'size-change';
var state = {
    items: [],
    open: false,
    isSelect: false
}

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
        this.draw();
        this.setupListeners();
        this.adjustSize(this.dropdownMenu);
    }

    grabElements() {
        this.dropdownContainer = this.shadowRoot.querySelector('.dropdown-container');
        this.dropdownMenu = this.shadowRoot.querySelector('ws-dropdown-menu');
        this.button = this.querySelector('button');
    }

    getAttributes() {
        let itemsAttributeValue = this.getAttribute('items');
        let isSelectAttributeValue = this.getAttribute('is-select');
        this.state = Object.assign({}, this.state, {
            items: itemsAttributeValue ? JSON.parse(itemsAttributeValue) : [],
            isSelect: isSelectAttributeValue ? isSelectAttributeValue.toLowerCase() === 'true' : false,
        });
    }

    draw() {
        this.dropdownMenu.setAttribute('items', JSON.stringify(this.state.items));
    }

    setupListeners() {
        this.dropdownMenu.addEventListener(SIZE_CHANGE_EVENT, (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.adjustSize(e.detail.menuSize);
        });
        this.dropdownMenu.addEventListener('change', (e) => {
            this.value = e.detail.value;
            this.state.open ? this.hide() : this.open();
        });
        this.dropdownMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.value = e.detail.item.label || e.detail.item;
            this.state.open ? this.hide() : this.open();
        });
        this.button.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.state.open ? this.hide() : this.open();
        });
    }

    get value() {
        return this.state.value;
    }

    set value(value) {
        this.state.value = value;
        if (this.state.isSelect) {
            let span = this.button.querySelector('span');
            if (span) {
                this.button.querySelector('span').textContent = value;
            } else {
                this.button.textContent = value;
            }
        }
    }

    open(event) {
        this.state.open = true;

        if (!this.dropdownContainer.classList.contains('mod-open')) {
            this.dropdownContainer.style.height = 0;
            this.dropdownContainer.classList.add('mod-open');
            this.dropdownMenu.animateIn();
        }
        this.adjustSize(this.dropdownMenu.height);

        document.body.addEventListener('click', () => this.hide());
    }

    /**
     * Hide the drop down on clicking outside of dropdown
     */
    hide() {
        this.state.open = false;

        document.body.removeEventListener('click', () => this.hide());

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
        let animationEndEvents = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];
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

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "items":
            case "is-select":
                this.getAttributes();
                this.draw();
                break;
        }
    };
}

//Register the element with the document
document.registerElement('ws-dropdown', WSDropdown);