window.WSDatePicker = Polymer({

    is: 'ws-date-picker',

    ready() {
        let wsDatePicker = this.$$('.ws-date-picker');
        // All logic in flatpickr.js file
        // API and guide how to use: https://chmln.github.io/flatpickr/
        this.pickr = flatpickr(this.root, wsDatePicker, {
            onChange: (date, value) => {
                this.fire('change', {date, value});
            },
            onClose: () => {
                this.fire('close');
            }
        });
        // Handle attributes
        if (this.hasAttribute('placeholder')) {
            wsDatePicker.setAttribute('placeholder', this.getAttribute('placeholder'));
        }
        if (this.hasAttribute('value')) {
            this.value = this.getAttribute('value');
        }
    },

    get value() {
        return this.pickr && this.pickr.selectedDateObj || null;
    },

    set value(val) {
        val = typeof val === 'string' ? new Date(val) : val;
        this.pickr.setDate(val, false);
    }
});
