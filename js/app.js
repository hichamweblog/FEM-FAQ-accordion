document.addEventListener('DOMContentLoaded', function () {
	const accordionButtons = document.querySelectorAll('.accordion-summary');

	accordionButtons.forEach((button) => {
		button.addEventListener('click', toggleAccordion);
		button.addEventListener('keydown', handleKeyPress);
	});

	function toggleAccordion(event) {
		event.preventDefault();
		const parentDetails = this.closest('.accordion-item');
		const wasOpen = parentDetails.hasAttribute('open');

		// Close all details elements and set their buttons to the plus image
		accordionButtons.forEach((btn) => {
			const details = btn.closest('.accordion-item');
			details.removeAttribute('open');
			btn.querySelector('img').setAttribute('src', '/icon-plus.svg');
			btn.setAttribute('aria-expanded', 'false');
			const contentId = btn.getAttribute('aria-controls');
			const content = document.getElementById(contentId);
			content.setAttribute('hidden', '');
		});

		// If the clicked details was not previously open, open it and set its button to the minus image
		if (!wasOpen) {
			parentDetails.setAttribute('open', '');
			this.querySelector('img').setAttribute('src', '/icon-minus.svg');
			this.setAttribute('aria-expanded', 'true');
			const contentId = this.getAttribute('aria-controls');
			const content = document.getElementById(contentId);
			content.removeAttribute('hidden');
			content.focus();
		}
	}

	function handleKeyPress(event) {
		const SPACE_KEY = 32;
		const ENTER_KEY = 13;
		const key = event.which || event.keyCode;

		switch (key) {
			case SPACE_KEY:
			case ENTER_KEY:
				toggleAccordion.call(this, event);
				break;
		}
	}
});
