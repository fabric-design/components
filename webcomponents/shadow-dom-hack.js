export function applyTemplate(containerElem, template) {
	'use strict';

	var lightDom = containerElem.children;
	// eine Instanz des Observers erzeugen
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			console.log('Mutation:',mutation);
			addLightDom(containerElem, template);
		});
	});

	// Konfiguration des Observers: alles melden - Änderungen an Daten, Kindelementen und Attributen
	var config = { attributes: true, childList: true, characterData: true };

	// eigentliche Observierung starten und Zielnode und Konfiguration übergeben
	observer.observe(lightDom, config);
}

function addLightDom(containerElem, template) {
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
