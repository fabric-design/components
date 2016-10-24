const rootTemplate = (document._currentScript || document.currentScript).ownerDocument.querySelector('template').content;
const dropdownTplElement = rootTemplate.getElementById('ws-dropdown-new');
const styleTplElement = rootTemplate.querySelector('style');

class WSDropdownNew extends HTMLElement {

    static ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

    createdCallback() {
        let dropdownElement = document.importNode(dropdownTplElement.content, true);
        let styleElement = styleTplElement.cloneNode(true);

        this.createShadowRoot();
        this.shadowRoot.appendChild(dropdownElement);
        this.shadowRoot.appendChild(styleElement);

        this.state = {};
        // Ensure the functions got the correct scope
        for (let key in this) {
            if (typeof this[key] === 'function') {
                this[key] = this[key].bind(this);
            }
        }
    }

    attachedCallback() {
        this.grabElements();
        this.readAttributes();
        this.draw();
        this.setupListeners();
        this.adjustSize(this.dropdownMenu);
    }

    grabElements() {
        this.dropdownContainer = this.shadowRoot.querySelector('.dropdown-container');
        this.dropdownMenu = this.shadowRoot.querySelector('ws-dropdown-menu');
        this.button = this.querySelector('button,a,.select-box');
        // Detect if there was an Element via content projected
        // nodeType 1 === ELEMENT_NODE, see http://www.w3schools.com/xml/dom_nodetype.asp
        let menuContent = this.shadowRoot.querySelector('#menu');
        this.hasMenuProjection = Array.from(menuContent.getDistributedNodes()).some(node => node.nodeType === 1);
    }

    readAttributes() {
        this.state.items = this.hasAttribute('items') ? JSON.parse(this.getAttribute('items')) : [];
        this.state.isSelect = this.hasAttribute('is-select');
        this.state.orientation = this.getAttribute('orientation') || 'left';
    }

    draw() {
        this.dropdownContainer.classList.remove("left", "right");
        this.dropdownContainer.classList.add(this.state.orientation);
        // Only set items on menu if there is no projected content
        if (!this.hasMenuProjection) {
            this.dropdownMenu.setAttribute('items', JSON.stringify(this.state.items));
        }
        // @todo handle select value update
    }

    setupListeners() {
        let stop = event => {
            event.stopPropagation();
            event.preventDefault();
        };
        this.dropdownMenu.addEventListener('change-size', event => {
            stop(event);
            this.adjustSize(event.detail.height);
        });
        // this event will bubble up to the listener outside
        this.dropdownMenu.addEventListener('change', event => {
            stop(event);
            this.state.selectedItem = event.detail.item;
            this.draw();
            this.state.open ? this.close() : this.open();
        });
        this.dropdownMenu.addEventListener('click', event => {
            stop(event);
            this.state.open ? this.close() : this.open();
        });
        this.button.addEventListener('click', event => {
            stop(event);
            this.state.open ? this.close() : this.open();
        });
    }

    attributeChangedCallback(attrName) {
        switch (attrName) {
            case "items":
            case "is-select":
            case "orientation":
                this.readAttributes();
                this.draw();
                break;
        }
    };

    onDocumentClick(event) {
        // Close the dropdown if the click was not inside
        if (!this.contains(event.target)) {
            this.close();
            document.removeEventListener('click', this.onDocumentClick, true);
        }
    }

    open(event) {
        this.state.open = true;
        this.dropdownContainer.style.height = 0;
        this.dropdownContainer.classList.add('mod-open');
        this.adjustSize(this.dropdownMenu.height);
        document.addEventListener('click', this.onDocumentClick, true);
    }

    /**
     * Hide the drop down on clicking outside of dropdown
     */
    close() {
        this.state.open = false;
        this.animateElement(this.dropdownContainer, 'animate-close', container => {
            container.classList.remove('mod-open');
        });
        document.removeEventListener('click', this.onDocumentClick, true);
    }

    adjustSize(newSize) {
        this.dropdownContainer.style.height = newSize + 'px';
    }

    animateElement(item, animationClass, callback) {
        // Define callback for animation end events
        let getEventHandler = eventName => {
            let eventHandler = () => {
                item.classList.remove(animationClass);
                item.removeEventListener(eventName, eventHandler);
                callback(item);
            };
            return eventHandler;
        };
        // Listen for all possible animation end events
        for (let eventName of WSDropdownNew.ANIMATION_END_EVENTS) {
            item.addEventListener(eventName, getEventHandler(eventName));
        }
        // Add class to start animation
        item.classList.add(animationClass);
    }
}

document.registerElement('ws-dropdown-new', WSDropdownNew);