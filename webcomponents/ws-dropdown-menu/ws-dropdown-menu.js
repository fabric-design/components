const ANIMATION_START_EVENTS = ['oAnimationStart', 'MSAnimationStart', 'animationstart'];
const ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

Polymer({
    is: 'ws-dropdown-menu',

    properties: {
        hasParent: {
            type: Boolean,
            value: false
        },
        items: {
            type: Array
        },
        hasItems: {
            type: Boolean,
            computed: 'itemsAreBound(items)'
        },
        menuClass: {
            type: String,
            computed: 'getMenuClass(hasParent)'
        }
    },

    itemsChanged() {
        if (this.menuContainer) {
            this.fire('change-size', {height: this.getHeight()});
        }
    },

    attached() {
        this.grabElements();
        this.setupListeners();
    },

    grabElements() {
        this.menuContainer = this.$$('.dropdown-menu');
        // Get the elements which were via <content> projected as menu
        // nodeType 1 === ELEMENT_NODE, see http://www.w3schools.com/xml/dom_nodetype.asp
        this.distributedNodes = Array.from(Polymer.dom(this.$.menu).getDistributedNodes());
        this.projection = this.distributedNodes.find(node => node.nodeType === 1 && node.classList.contains('dropdown-menu'));
        if (this.projection) {
            this.menuContainer = this.projection;
        }
    },

    setupListeners() {
        this.menuContainer.addEventListener('click', event => {
            // If the menu is projected we just want to close the menu since the original click will be handled elsewhere
            if (!this.projection) {
                event.stopPropagation();
            }
        });
        this.menuContainer.addEventListener('go-back', event => {
            event.stopPropagation();
            this.showParent();
        }, true)
    },

    getHeight() {
        return this.menuContainer.clientHeight;
    },

    itemsAreBound() {
        return !!this.items;
    },

    getMenuClass(hasParent) {
        return `dropdown-menu ${hasParent ? '' : 'dropdown-root-menu'}`;
    },

    getItemLabel(item) {
        return item.label || item;
    },

    getItemIconClass(icon) {
        return `icon ${icon}`;
    },

    getItemAnchorClass(change) {
        return `text ${change.base.selected ? 'is-active' : change.base.focused ? 'is-focused' : ''}`;
    },

    next(event) {
        let item = event.currentTarget.item;
        // Show next menu if children are available
        if (item.children && item.children.length) {
            this.showChild(event.currentTarget.querySelector('ws-dropdown-menu'));
        }
        else if (item) {
            this.propagate('change', item);
        }
        else {
            this.propagate('click', item);
        }
        return false;
    },

    back() {
        // Call the parent menu to start back animation (sub out and main in)
        this.propagate('go-back');
    },

    close() {
        this.menuContainer.classList.remove('mod-sub-open', 'mod-menu-open');
        if (!!this.openSubMenu) {
            this.openSubMenu.close();
        }
    },

    showChild(subMenu) {
        this.openSubMenu = subMenu;
        this.propagate('change-size', {height: subMenu.getHeight()});
        this.animateOut();
        subMenu.animateIn();
    },

    showParent() {
        if (this.openSubMenu) {
            this.propagate('change-size', {height: this.getHeight()});
            this.openSubMenu.animateOut(true);
            this.animateIn(true);
            this.openSubMenu = null;
        }
    },

    animateIn(goBack) {
        this.isOpen = true;
        let inAnimation = goBack ? 'animate-in' : 'animate-sub-in';
        // Create a clone of new sub menu for animations
        this.animateElement(this.menuContainer, inAnimation, menu => {
            menu.classList.remove('mod-sub-open');
            menu.classList.add('mod-menu-open');
        });
    },

    animateOut(goBack) {
        this.isOpen = false;
        let outAnimation = !goBack ? 'animate-out' : 'animate-sub-out';
        // Fade out old element and set mod-item-open if going back and mod-sub-open for going deeper
        this.animateElement(this.menuContainer, outAnimation, menu => {
            menu.classList.remove('mod-menu-open');
            if (!goBack) {
                menu.classList.add('mod-sub-open');
            }
        });
    },

    animateElement(item, animationClass, callback) {
        let eventCounter = 0;
        // Handler for animation end event
        let handler = event => {
            // Do nothing until all started events are done
            if (--eventCounter) {
                return;
            }
            // Remove all animation end event listeners from this item. They won't get called anymore
            for (let eventName of ANIMATION_END_EVENTS) {
                item.removeEventListener(eventName, handler);
            }
            item.classList.remove(animationClass);
            callback(item);
        };
        // Listen for all possible animation end events
        for (let eventName of ANIMATION_END_EVENTS) {
            item.addEventListener(eventName, handler);
        }
        // Increase started event counter for each animation start event
        for (let eventName of ANIMATION_START_EVENTS) {
            item.addEventListener(eventName, () => eventCounter++);
        }
        // Add class to start animation
        item.classList.add(animationClass);
    },

    propagate(eventName, detail) {
        this.fire(eventName, detail);
    }
});
