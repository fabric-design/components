const ANIMATION_START_EVENTS = ['oAnimationStart', 'MSAnimationStart', 'animationstart'];
const ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

Polymer({
    is: 'ws-dropdown-menu',

    properties: {
        parent: {
            type: Object,
            value: null
        },
        items: {
            type: Array,
            observer: 'io'
        },
        value: {
            type: Array,
            value: []
        },
        multiple: {
            type: Boolean,
            value: false
        },
        hasValue: {
            type: Boolean,
            computed: 'valueNotEmpty(value)'
        },
        hasParent: {
            type: Boolean,
            computed: 'isChildMenu(parent)'
        },
        hasItems: {
            type: Boolean,
            computed: 'itemsAreBound(items)'
        },
        menuClass: {
            type: String,
            computed: 'getMenuClass(parent)'
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
        // Projected content doesn't matter
        if (this.menuContainer) {
            return
        }
        // Get the elements which were via <content> projected as menu
        // nodeType 1 === ELEMENT_NODE, see http://www.w3schools.com/xml/dom_nodetype.asp
        this.distributedNodes = Array.from(Polymer.dom(this.$.menu).getDistributedNodes());
        this.projection = this.distributedNodes.find(node => node.nodeType === 1 && node.classList.contains('dropdown-menu'));
        if (this.projection) {
            this.menuContainer = this.projection;
        }
        // Check if menu projection or items are present
        if (!this.menuContainer && !this.items) {
            throw new Error('No menu for dropdown available. Either you specify `items` attribute/property as array or '
                + 'you add a `.dropdown-menu.dropdown-root-menu` element to the dropdown children');
        }
    },

    setupListeners() {
        if (!this.menuContainer) {
            return;
        }
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

    isNotRendered() {
        return !this.menuContainer;
    },

    isChildMenu(parent) {
        return !!parent;
    },

    valueNotEmpty(value) {
        return value && value.length;
    },

    itemsAreBound(items) {
        return !!items;
    },

    itemNotSelected(item) {
        return !item.stored;
    },

    getMenuClass(parent) {
        return `dropdown-menu ${!!parent ? '' : 'dropdown-root-menu'}`;
    },

    getItemLabel(item) {
        return item.label || item;
    },

    getItemIconClass(icon) {
        return `icon ${icon}`;
    },

    getItemAnchorClass(change) {
        let item = change.base;
        return `text ${item.selected ? 'is-active' : item.focused ? 'is-focused' : ''}`;
    },

    clearSelections() {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].selected && !this.items[i].stored) {
                this.set(`items.${i}.selected`, false);
            }
        }
    },

    submit() {
        let value = [];
        // Save selected items to values and set flag to indicate they are stored in value
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].selected) {
                this.set(`items.${i}.stored`, true);
                value.push(this.items[i]);
            }
            else if (this.items[i].stored) {
                this.set(`items.${i}.stored`, false);
            }
        }
        this.propagate('change', value);
        // Delay this so that the dropdown is closed already
        setTimeout(() => this.set('value', value), 10);
    },

    next(event) {
        let type = event.currentTarget.hasAttribute('stored') ? 'value' : 'items';
        let item = event.currentTarget.item;
        let index = this[type].indexOf(item);
        // Show next menu if children are available
        if (item.children && item.children.length) {
            this.showChild(event.currentTarget.querySelector('ws-dropdown-menu'));
        }
        else if (item) {
            this.set(`${type}.${index}.selected`, !item.selected);
            if (!this.multiple) {
                this.propagate('change', item);
            }
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
