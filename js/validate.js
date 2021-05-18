'use strict';

(function () {

	let adForm = document.querySelector(".ad-form");
	let adTitle = adForm.querySelector('#title');
	//let adType = adForm.querySelector('#type');
	let adPrice = adForm.querySelector('#price');

	function validateAdTitle(evt) {
		let message;
		if(adTitle.validity.tooShort) {
			message="Заголовок объявления слишком короткий. Он должен состоять минимум из 30 символов."
		} else if(adTitle.validity.tooLong) {
			message="Заголовок объявления слишком длинный. Он должен состоять максимум из 100 символов."
		} else if(adTitle.validity.valueMissing) {
			message="Введите заголовок объявления. Он должен быть от 30 до 100 символов."
		} else {
			message="";
		}

		adTitle.setCustomValidity(message);
	}
	//поле тип жилья влияет на минимальное значение поля цена за ночь 
	//вместе с минимальным значением нужно менять и плейсхолдер
	function changeMinOnAdPrice(evt) {
		let type = evt.currentTarget.value;
		switch (type) {
			case 'bungalo':
				adPrice.min = 0;
				adPrice.placeholder = '0';
				break;
			case 'flat':
				adPrice.min = 1000;
				adPrice.placeholder = '1000';
				break;
			case 'house':
				adPrice.min = 5000;
				adPrice.placeholder = '5000';
				break;
			case 'palace':
				adPrice.min = 10000;
				adPrice.placeholder = '10000';
				break;
		
			default:
				adPrice.min = 5000;
				adPrice.placeholder = '5000';
				break;
		}
	}

	function validateAdPrice(evt) {
		let message;
		if (evt.currentTarget.validity.rangeUnderflow) {
			message="Минимальная цена за ночь " + adPrice.min;
		} else if (adPrice.validity.rangeOverflow) {
			message="Максимальная цена за ночь 1000000";
		} else if (adPrice.validity.valueMissing) {
			message = 'Введите цену за ночь!';
		} else {
			message="";
		}
		adPrice.setCustomValidity(message);
	}

	window.validate = {
		validateAdTitle: validateAdTitle,
		changeMinOnAdPrice: changeMinOnAdPrice,
		validateAdPrice: validateAdPrice,
	}
})();