const ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

window.WSDropdown = Polymer({
    is: 'ws-dropdown',

    properties: {
        items: {
            type: Array,
            readOnly: false,
            notify: false
        },
        isSelect: {
            type: Boolean,
            value: true
        },
        orientation: {
            type: String,
            readOnly: false,
            notify: true
        },
        containerClass: {
            type: String,
            computed: 'getContainerClass(orientation)'
        }
    },

    getContainerClass(orientation) {
        return `dropdown-container ${orientation}`;
    },

    attached() {
        this.grabElements();
        this.setupListeners();
        this.adjustSize(this.dropdownMenu);
    },

    grabElements() {
        this.dropdownContainer = this.$$('.dropdown-container');
        this.dropdownMenu = this.$$('ws-dropdown-menu');
        this.button = Polymer.dom(this.$.button).getDistributedNodes()[0];
    },

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
            this.selectedItem = event.detail.item;
            this.isOpen ? this.close() : this.open();
        });
        this.dropdownMenu.addEventListener('click', event => {
            stop(event);
            this.isOpen ? this.close() : this.open();
        });
        this.button.addEventListener('click', event => {
            stop(event);
            this.isOpen ? this.close() : this.open();
        });
    },

    onDocumentClick(event) {
        // Close the dropdown if the click was not inside
        if (!this.contains(event.target)) {
            this.close();
            document.removeEventListener('click', this.onDocumentClick, true);
        }
    },

    open(event) {
        this.isOpen = true;
        this.dropdownContainer.style.height = 0;
        this.dropdownContainer.classList.add('mod-open');
        this.adjustSize(this.dropdownMenu.getHeight());
        document.addEventListener('click', this.onDocumentClick, true);
    },

    /**
     * Hide the drop down on clicking outside of dropdown
     */
    close() {
        this.isOpen = false;
        this.animateElement(this.dropdownContainer, 'animate-close', container => {
            container.classList.remove('mod-open');
        });
        document.removeEventListener('click', this.onDocumentClick, true);
    },

    adjustSize(newSize) {
        this.dropdownContainer.style.height = newSize + 'px';
    },

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
        for (let eventName of ANIMATION_END_EVENTS) {
            item.addEventListener(eventName, getEventHandler(eventName));
        }
        // Add class to start animation
        item.classList.add(animationClass);
    }
});
