function applyTemplate(containerElem, template) {
	'use strict';

	addLightDom(containerElem, template);

	var innerContainerSelector = '.' + containerElem.tagName.toLowerCase();

	var observer = new MutationObserver(function(mutations) {
		var changed = false;
		mutations.forEach(function(mutation) {
			var target = mutation.target;
			if (target instanceof Text) {
				// text elements have no closest function
				target = target.parentNode;
			}
			if (target === containerElem) {
				return;
			}
			// ignore changes inside of pseudo shadow dom
			if(target.closest(innerContainerSelector)) {
				return;
			}

			changed = true;
		});

		if (changed) {
			addLightDom(containerElem, containerElem.querySelector(innerContainerSelector));
		}
	});

	// Configuration of the observer
	var config = {
		attributes: true,
		childList: true,
		characterData: true,
		subtree:true
	};

	observer.observe(containerElem, config);
}

function addLightDom(containerElem, template) {
	'use strict';

	var innerContainerSelector = '.' + containerElem.tagName.toLowerCase();

	let contentTags = template.querySelectorAll('content');
	Array.from(contentTags).forEach(contentTag => {
		contentTag.innerHTML = '';
		let selection = contentTag.getAttribute('select');
		if (selection) {
			let selectedLightDomElems = Array.from(containerElem.children)
				.filter(child => child.matches(selection))
				.filter(elem => !elem.closest(innerContainerSelector));

			selectedLightDomElems.forEach(selectedLightDomElem => {
				var clone = selectedLightDomElem.cloneNode(true);
				contentTag.appendChild(clone);
			});
		}
	});

	var lightDom = Array.from(containerElem.children).filter(elem => {
		return elem.classList
			&& !elem.classList.contains(innerContainerSelector.substr(1));
	});
	for(var child of lightDom) {
		if (!child.classList.contains('light-dom')) {
			child.classList.add('light-dom');
		}
	}

	containerElem.appendChild(template);
}
