var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');

var state = {
    items: []
}

class WSDropdownButton extends HTMLButtonElement {
    // Use createdCallback instead of constructor to init an element.
    createdCallback() {
        let clone = document.importNode(template.content.getElementById('ws-dropdown-button').content, true);
        let styleElement = template.content.querySelector('style').cloneNode(true);

        // This element uses Shadow DOM.
        this.createShadowRoot().appendChild(clone);
        this.shadowRoot.appendChild(styleElement);

        this.state = state;
        this.grabElements();
        this.getAttributes();
        this.draw();
        this.setupListeners();
    }

    grabElements() {
        this.dropdownElement = this.shadowRoot.querySelector('ws-dropdown');
        this.button = this.shadowRoot.querySelector('.dropdown-button');
    }

    getAttributes() {
        let itemsAttributeValue = this.getAttribute('items');
        this.state = Object.assign({}, this.state, {
            items: itemsAttributeValue && JSON.parse(itemsAttributeValue)
        });
    }

    draw() {
        this.dropdownElement.setAttribute('items', JSON.stringify(this.state.items));
    }

    setupListeners() {
        this.dropdownElement.addEventListener('change', (e) => this.onChange(e));
        this.button.addEventListener('click', (e) => this.open(e));
    }

    onChange(event) {
        event.stopPropagation();
        this.element.dispatchEvent(event);
    }

    open(event) {
        event.stopPropagation();
        event.preventDefault();
        this.dropdownElement.open();
        document.body.addEventListener('click', this.hide.bind(this));
    }

    /**
     * Hide the drop down on clicking outside of dropdown
     */
    hide() {
        document.body.removeEventListener('click', this.hide.bind(this));
        this.dropdownElement.close();
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
                this.getAttributes();
                this.draw();
                break;
        }
    };
}

//Register the element with the document
document.registerElement('ws-dropdown-button', WSDropdownButton);