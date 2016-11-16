/**
 * This class represents the ws-notification custom element
 * The element accepts the attributes title, description, type = 'info' and lifetime = 5000
 * It hides and removes itself on click or on lifetime end.
 * Valid types are: error, success, warning and info
 * A lifetime of 0 means endless
 *
 * Example: <ws-notification title="some title" description="This could be skipped" type="error" lifetime="0"/>
 */
Polymer({

    is: 'ws-notification',

    properties: {
        title: {
            type: String
        },
        type: {
            type: String,
            value: 'info'
        },
        description: {
            type: String,
            value: ''
        },
        lifetime: {
            type: Number,
            value: 10000
        },
        notificationClass: {
            type: String,
            computed: 'getNotificationClass(type)'
        },
        contentClass: {
            type: String,
            computed: 'getContentClass(description)'
        }
    },

    getNotificationClass(type) {
        return `notification ${type}`;
    },

    getContentClass(description) {
        return `content ${description ? 'has-description' : ''}`
    },

    ready() {
        this.addEventListener('click', event => this.close(), true);
    },

    close() {
        this.style.transition = 'opacity .2s ease-out, max-height .8s ease, margin-bottom .8s ease';
        this.style.willChange = 'opacity, max-height, margin-bottom';
        this.style.opacity = 0;
        this.style.maxHeight = 0;
        this.style.marginBottom = 0;
        setTimeout(() => {
            this.parentElement.removeChild(this);
            this.dispatchEvent(new CustomEvent('closed'));
            clearTimeout(this.timeoutId);
        }, 1000);
    },

    attached() {
        if (this.lifetime && !this.timeoutId) {
            this.timeoutId = setTimeout(() => this.close(), this.lifetime);
        }
    }
});

/**
 * This class intends to create an easy to use approach for creating notifications.
 *
 * simply call wsNotification.create(options)
 * possible options are:
 *  title: string
 *  description: string (optional)
 *  type: info|warning|error|success (default: info
 *  lifetime: number (default: 5000ms, 0 for endless)
 */
class NotificationHandler {

    constructor() {
        this.notifications = [];
        this.list = null;
        // Bind functions to this scope
        this.isInitialized = this.isInitialized.bind(this);
        this.init = this.init.bind(this);
        this.create = this.create.bind(this);
    }

    isInitialized() {
        return !!this.list;
    }

    init(root) {
        root = root || document.body;
        // Prevent duplicate initialization
        if (root.querySelector('.ws-notification-list')) {
            return;
        }
        var wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'ws-notification-wrapper');
        this.list = document.createElement('div');
        this.list.setAttribute('class', 'ws-notification-list');
        wrapper.appendChild(this.list);

        root.appendChild(wrapper);
    }

    create({title, description, type, lifetime}) {
        if (!this.isInitialized()) {
            throw new Error('You have to initialize the notification handler with init() before creating notification.');
        }
        var notification = document.createElement('ws-notification');
        title !== undefined && notification.setAttribute('title', title);
        description !== undefined && notification.setAttribute('description', description);
        type !== undefined && notification.setAttribute('type', type);
        lifetime !== undefined && notification.setAttribute('lifetime', lifetime);

        this.animateIn(notification);

        return this.notifications.push(notification);
    }

    animateIn(notification) {
        this.list.appendChild(notification);
        var marginBottom = parseInt(document.defaultView.getComputedStyle(notification).marginBottom, 10);
        var height = notification.clientHeight + marginBottom;
        // Initial close the notification
        this.list.style.transition = `none`;
        this.list.style.transform = `translate3d(0, ${height}px, 0)`;
        setTimeout(() => {
            this.list.style.transition = `transform .35s cubic-bezier(.35, 1, .69, .98) .1s`;
            this.list.style.transform = `translate3d(0, 0, 0)`;
        }, 0);
    }
}

window.wsNotification = new NotificationHandler();