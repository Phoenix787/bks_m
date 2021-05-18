/**
 * модуль, который работает с формой объявления
 */
(function () {
  let map = document.querySelector(".map");
  let mainPin = document.querySelector(".map__pin--main");
  let adForm = document.querySelector(".ad-form");
	let adTitle = adForm.querySelector('#title');
	let adType = adForm.querySelector('#type');
	let adPrice = adForm.querySelector('#price');
	let adTimeIn = adForm.querySelector('#timein');
	let adTimeOut = adForm.querySelector('#timeout');
	let capacity = adForm.querySelector('#capacity');
	let roomNumber = adForm.querySelector('#room_number');



  let fieldSets = adForm.children;
	//блокируем поля формы с помощью добавления класса disabled
  window.util.setDisabled(fieldSets);

  let addressElement = adForm.querySelector("#address");
  addressElement.value = `${parseInt(mainPin.style.left)}, ${parseInt(
    mainPin.style.top
  )}`;

	adTitle.addEventListener('invalid', window.validate.validateAdTitle);
	adType.addEventListener('change', window.validate.changeMinOnAdPrice);
	adPrice.addEventListener('invalid', window.validate.validateAdPrice);
	adTimeIn.addEventListener('change', (evt)=> {
		adTimeOut.selectedIndex = evt.currentTarget.selectedIndex;
		evt.preventDefault();
	});

	adTimeOut.addEventListener('change', (evt) => {
		adTimeIn.selectedIndex = evt.currentTarget.selectedIndex;
		evt.preventDefault();
	});

	roomNumber.addEventListener('change', (evt) => {

		let mappedOptions = {
			1: [2],
			2: [1, 2],
			3: [0, 1, 2],
			100: [3]
		}

		let value = evt.currentTarget.value;
		let availableOptions = mappedOptions[value];

		capacity.selectedIndex = availableOptions[0];

		enableItems(capacity, availableOptions);
 //------------------------------------------------------------------------------------------
		function enableItems(element, availableOptions) {
			for(let i = 0; i < element.options.length; i++) {
				if(availableOptions.indexOf(+element.options[i].index) !== -1) {	
					element.options[i].disabled = false;
				} else {
					element.options[i].disabled = true;
				}
			}
		}
	});

  adForm.addEventListener("submit", (evt) => {
    window.backend.save(
      new FormData(adForm),
			() => {
				onSuccess();
				window.backend.load((list) => {
					window.map.successLoadedData(list);
				}, onError);
				//reset form
			}, 
      onError);
			resetForm();
    evt.preventDefault();
  });

  //метод указания координат адреса метки
  function updateAddress(pin, pinHeight, pinTail) {
    let result = calcCenterOfPin(parseInt(pin.style.left), parseInt(pin.style.top));
    addressElement.value = `${Math.round(result.x)}, ${Math.round(
      result.y + pinHeight / 2 + pinTail
    )}`;
  }

  function calcCenterOfPin(x, y) {
    let newX = Math.floor((x + 65) / 2);
    let newY = Math.floor((y + 65) / 2);
    return {
      x: newX,
      y: newY,
    };
  }

  function activateMap() {
    map.classList.remove("map--faded");
    adForm.classList.remove("ad-form--disabled");
    for (let el of fieldSets) {
      el.removeAttribute("disabled");
    }
    window.backend.load((list) => {
      window.map.successLoadedData(list);
    }, onError);
  }

	function resetForm() {
		adForm.reset();
		updateAddress(mainPin, mainPin.offsetHeight, 22);
	}
	
	/**
	 * @param {*} message 
	 */
  function onError(message) {
    let divError = document.createElement("div");
		let pError = document.createElement('p');
		divError.classList.add("error");
		pError.classList.add("error__message");
    pError.textContent = message;
		divError.appendChild(pError);

    document.body.appendChild(divError);

    setTimeout(() => {
			document.body.removeChild(divError);
      //divError.classList.add("hidden");
    }, 5000);
  }
/**
 * 
 * @param {*} message 
 */
	function onSuccess() {
		let divSuccess = document.createElement("div");
		let pSuccess = document.createElement('p');
		divSuccess.classList.add("success");
		pSuccess.classList.add("success__message");
    pSuccess.textContent = "Успешно";
		divSuccess.appendChild(pSuccess);

    document.body.appendChild(divSuccess);
		activateMap();

    setTimeout(() => {
			document.body.removeChild(divSuccess);
     // divSuccess.classList.add("hidden");
    }, 3000);
	}

  window.form = {
    activateMap: activateMap,
    updateAddress: updateAddress,
  };
})();
