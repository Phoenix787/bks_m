(function () {

	const DEBOUNCE_INTERVAL = 500;
	const FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
	

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
/**
 * 
 * @param {*} files файлы выбранные пользователем с помощью <input type=file>
 * @param {*} srcOfElem элемент с атрибутом src
 */
	function handleFiles(files, srcOfElem) {
		let file = files[0];
		let fileName = file.name.toLowerCase();
	
		let matches = FILE_TYPE.some((it) => fileName.endsWith(it));
	
		if (matches) {
			let reader = new FileReader();
			reader.addEventListener('load', (e) => {
				srcOfElem.src = reader.result;
			});
			reader.readAsDataURL(file);
		}
	}

	window.util = {
		setDisabled: setDisabled,
		generateRandomNumber: generateRandomNumber,
		getArrayLength: getArrayLength,
		shuffleArray: shuffleArray,
		debounce: debounce,
		handleFiles: handleFiles,
		FILE_TYPE: FILE_TYPE
	}
})();