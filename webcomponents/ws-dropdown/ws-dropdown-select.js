var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');

var state = {
    items: [],
    open: false
}

class WSDropdownSelect extends WSDropdownButton {
    // Use createdCallback instead of constructor to init an element.
    createdCallback() {
        let clone = document.importNode(template.content.getElementById('ws-dropdown-select').content, true);
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

    setupListeners() {
        this.dropdownElement.addEventListener('change', (e) => {
            this.value = e.detail.value;
            this.state.open ? this.hide() : this.open();
        });
        this.button.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.state.open ? this.hide() : this.open();
        });
        this.dropdownElement.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.value = e.detail.item.label || e.detail.item;
            this.state.open ? this.hide() : this.open();
        });
    }

    get value() {
        return this.state.value;
    }

    set value(value) {
        this.state.value = value;
        this.button.querySelector('span').textContent = value;
    }
}

//Register the element with the document
document.registerElement('ws-dropdown-select', WSDropdownSelect);