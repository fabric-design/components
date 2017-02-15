var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');

const SIZE_CHANGE_EVENT = 'size-change';
var state = {
    items: [], // {selected, href, icon, label, children}
    open: false,
    isSelect: false,
    bodyClickHandler: null,
    selectedItem: null,
    orientation: 'right' // right,left
};
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
    }

    grabElements() {
        this.dropdownContainer = this.shadowRoot.querySelector('.dropdown-container');
        this.dropdownMenu = this.shadowRoot.querySelector('ws-dropdown-menu');
        this.button = this.querySelector('button,a');
    }

    getAttributes() {
        let itemsAttributeValue = this.getAttribute('items');
        let items = itemsAttributeValue ? JSON.parse(itemsAttributeValue) : [];
        let isSelectAttributeValue = this.getAttribute('is-select');
        let isSelect = isSelectAttributeValue ? isSelectAttributeValue.toLowerCase() === 'true' : false
        this.state = Object.assign({}, this.state, {
            items,
            isSelect,
            selectedItem: this.state.selectedItem ? this.state.selectedItem : this.getSelectedItem(items),
            orientation: this.getAttribute('orientation')
        });
    }

    // will grad first selected to display initially
    getSelectedItem(items) {
        let selectedItem = items.find(item => item.selected);
        if (!selectedItem) {
            selectedItem = items.reduce((selectedItem, item) => {
                if (selectedItem) return;
                if (item.children) return this.getSelectedItem(item.children);
                return;
            }, selectedItem)
        }
        return selectedItem;
    }

    draw() {
        this.dropdownContainer.classList.remove("left", "right");
        this.dropdownContainer.classList.add(this.state.orientation);

        this.dropdownMenu.setAttribute('items', JSON.stringify(this.state.items));

        if (this.state.isSelect && this.state.selectedItem) {
            let span = this.button.querySelector('span');
            let label = this.state.selectedItem.label;
            if (span) {
                this.button.querySelector('span').textContent = label;
            } else {
                this.button.textContent = label;
            }
        }
    }

    drawSelected() {
        let span = this.button.querySelector('span');
        let label = this.state.selectedItem.label;
        if (span) {
            this.button.querySelector('span').textContent = label;
        } else {
            this.button.textContent = label;
        }
    }

    setupListeners() {
        this.dropdownMenu.addEventListener(SIZE_CHANGE_EVENT, (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.adjustSize(e.detail.menuSize);
        });
        // this event will bubble up to the listener outside
        this.dropdownMenu.addEventListener('change', (e) => {
            this.state.selectedItem = e.detail.item;
            this.draw();
            this.state.open ? this.close() : this.open();
        });
        this.dropdownMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.state.open ? this.close() : this.open();
        });
        this.button.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.state.open ? this.close() : this.open();
        });

        this.state.bodyClickHandler = () => this.close();
    }

    get value() {
        return this.state.selectedItem ? this.state.selectedItem.value : null;
    }

    open(event) {
        this.state.open = true;

        this.dropdownContainer.style.height = 0;
        this.dropdownContainer.classList.add('mod-open');
        this.dropdownMenu.animateIn();
        this.adjustSize(this.dropdownMenu.height);

        document.body.addEventListener('click', this.state.bodyClickHandler);
    }

    /**
     * Hide the drop down on clicking outside of dropdown
     */
    close() {
        this.state.open = false;

        document.body.removeEventListener('click', this.state.bodyClickHandler);

        this.animateElement(this.dropdownContainer, 'animate-close', container => {
            container.classList.remove('mod-open');
            this.dropdownMenu.close();
        });
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
        animationEndEvents.forEach(eventName => {
            item.addEventListener(eventName, getHandler(eventName));
        })
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

    attachedCallback() {
        this.grabElements();
        this.getAttributes();
        this.draw();
        this.setupListeners();
        this.adjustSize(this.dropdownMenu);
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "items":
            case "is-select":
            case "orientation":
                if(typeof this.dropdownContainer === 'undefined'){
                   this.grabElements();
                }
                this.getAttributes();
                this.draw();
                break;
        }
    };
}

//Register the element with the document
document.registerElement('ws-dropdown', WSDropdown);