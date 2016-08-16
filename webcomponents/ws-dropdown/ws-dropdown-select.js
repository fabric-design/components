var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');

var state = {
}

class WSDropdown extends HTMLSelectElement {
    // Use createdCallback instead of constructor to init an element.
    createdCallback() {
        let clone = document.importNode(template.content.getElementById('ws-dropdown-select').content, true);

        // This element uses Shadow DOM.
        this.createShadowRoot().appendChild(clone);

        this.state = state;
        this.getAttributes();
    }

    propagateError(reason) {
        let event = new CustomEvent("error", {
            detail: {
                message: reason
            }
        });
        this.dispatchEvent(event);
    }

    getAttributes() {
        this.state = Object.assign({}, this.state, {
        });
    }

    // You can also define the other lifecycle methods.
    attachedCallback() { }
    detachedCallback() { }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
        }
    };
}

//Register the element with the document
document.registerElement('ws-dropdown-select', WSDropdown);