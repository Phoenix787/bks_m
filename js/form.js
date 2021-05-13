/**
 * модуль, который работает с формой объявления
 */
(function() {
	//let map = document.querySelector(".map");
let mainPin = document.querySelector('.map__pin--main');
let adForm = document.querySelector(".ad-form");
let fieldSets = adForm.children;
window.util.setDisabled(fieldSets);

let addressElement = adForm.querySelector('#address');
addressElement.value = `${parseInt(mainPin.style.left)}, ${parseInt(mainPin.style.top)}`;

adForm.addEventListener('submit', (evt)=> {
	window.backend.save(new FormData(adForm), () => {
		//onSuccess
	}, onError);
	evt.preventDefault();
});

//метод указания координат адреса метки
function updateAddress(evt, pinHeight, pinTail) {
	let result = calcCenterOfPin(evt.clientX, evt.clientY)
	addressElement.value = `${Math.round(result.x )}, ${Math.round(result.y + pinHeight/2 + pinTail)}`;
}

function calcCenterOfPin(x, y) {
	let newX = Math.floor((x + 65 ) / 2);
	let newY = Math.floor((y + 65) / 2);
	return {
		x: newX,
		y: newY
	}
}

function activateMap() {
	map.classList.remove("map--faded");
	adForm.classList.remove("ad-form--disabled");
	for(let el of fieldSets) {
		el.removeAttribute('disabled');
	}
	//window.map.generatePins(window.map.list);
	window.backend.load((list) => {
	//	window.map.generatePins(list);
		window.map.successLoadedData(list);
		
	}, onError);
}


function onError(message) {
	let divError = document.createElement('div');
	divError.classList.add('error');
	divError.textContent = message;

	document.body.appendChild(divError);

	setTimeout(() => {
		divError.classList.add('hidden');

	}, 6000);
}


window.form = {
	activateMap: activateMap,
	updateAddress: updateAddress
}
})();