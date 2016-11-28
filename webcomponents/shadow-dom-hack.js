export function applyTemplate(containerElem, template) {
	'use strict';

	let contentTags = template.querySelectorAll('content');
	contentTags.forEach(contentTag => {
		let selection = contentTag.getAttribute('select');
		if (selection) {
			let selectedLightDomElems = containerElem.querySelectorAll(selection);

			selectedLightDomElems.forEach(selectedLightDomElem => {
				contentTag.appendChild(selectedLightDomElem.cloneNode(true));
			});
		}
	});

	for(var child of containerElem.children) {
		child.style.display = 'none';
	}

	containerElem.appendChild(template);
}
