var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');
class ZWebComponent extends HTMLElement {
	// overwrite!
	// do some initial stuff
	// can return a state
	init(state) {}

	// overwrite!
	// update your state according to the current state
	updateState(state) {
		return state;
	}

	// overwrite!
	// update the dom
	updateUI(state) {}

	// don't overwrite
	lifeCycle(state) {
		var newState = this.updateState(state);

		this.updateUI(newState);

		this.state = newState;
	}

	// don't overwrite
	createdCallback() {
		let clone = document.importNode(template.content, true);

		// This element uses Shadow DOM.
		applyTemplate(this, clone);

		this.state = this.grabAttributes({});
		var newState = this.init(this.state);
		if (newState) {
			this.state = newState;
		}
	}

	// don't overwrite
	attributeChangedCallback(attrName, oldVal, newVal) {
		// update the state from the attributes
		var newState = {...this.state};
		newState[hyphenToCamelCase(attrName)] = newVal;

		// update state and dom
		this.lifeCycle(newState);
	};

	// don't overwrite
	// grab initialy all attributes and put them in state
	grabAttributes(state) {
		return Array.from(this.attributes).reduce((state, attribute) => {
			var attributeKeyValuePair = {};
			attributeKeyValuePair[hyphenToCamelCase(attribute.nodeName)] = attribute.nodeValue;
			return {
				...state,
				...attributeKeyValuePair
			}
		}, state);
	}
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function hyphenToCamelCase(name) {
	'use strict';

	return name.split('-')
		.map((part, index) => index === 0
			? part
			: capitalizeFirstLetter(part))
		.join('');
}
