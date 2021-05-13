(function () {

	const DEBOUNCE_INTERVAL = 500;
	

	function setDisabled(elements){
		for(let element of elements) {
			element.setAttribute('disabled', 'disabled');
		}
	}
	function generateRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	//функция возвращяющая массив произвольной длины
	function getArrayLength(arr) {
		let clone = arr.slice();
		clone.length = generateRandomNumber(1, arr.length);
		return clone;
	}
	
	//------------------------------------------------------------------------------
	function shuffleArray(arr) {
		let mixed = arr.slice();
		for (let i = mixed.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i + 1));
			let tmpItem = mixed[i];
			mixed[i] = mixed[randomIndex];
			mixed[randomIndex] = tmpItem;
		}
	
		return mixed;
	}

	function debounce(fun) {
		let lastTimeout = null;

		return function() {
			let args = arguments;
			if(lastTimeout) {
				window.clearTimeout(lastTimeout);
			}
			lastTimeout = window.setTimeout(function() {
				fun.apply(null, args);
			}, DEBOUNCE_INTERVAL);
		}
	}

	window.util = {
		setDisabled: setDisabled,
		generateRandomNumber: generateRandomNumber,
		getArrayLength: getArrayLength,
		shuffleArray: shuffleArray,
		debounce: debounce

	}
})();