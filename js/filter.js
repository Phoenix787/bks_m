/**
 * фильтровать с помощью фильтров, расположенных в блоке .map__filters. 
 * После фильтрации должны показываться те метки из набора данных, которые подходят под выбранные фильтры. 
 * Метки, отрисованные до этого нужно убрать
 * 
 * Все выбранные фильтры применяются вместе: один фильтр не отменяет другие, выбранные до него. 
 * Например, после выбора типа жилья можно указать диапазон стоимости и дополнения и в этом случае, 
 * на карте должны показываться только те метки, которые подходят под ВСЕ условия
 */

(function () {

	let mapFilters = document.querySelector('.map__filters');
	let filtersElement = {
		housingType: mapFilters.querySelector('#housing-type'),
		housingPrice: mapFilters.querySelector('#housing-price'),
		housingRooms: mapFilters.querySelector('#housing-rooms'),
		housingGuests: mapFilters.querySelector('#housing-guests'),
		housingFeatures: mapFilters.querySelectorAll('#housing-features')
	}

	let externalFilterChangeCallback = null;

	const Filter = {
		FILTERED_DEFAULT_TYPE: 'any',
		OFFER_PRICE_MIN: 10000,
		OFFER_PRICE_MAX: 50000
	};
	const MAX_PINS = 5;

	function filterByType(ad) {
		return filtersElement.housingType.value === Filter.FILTERED_DEFAULT_TYPE || ad.offer.type === filtersElement.housingType.value;
	}

	function filterByPrice(ad) {
		switch(filtersElement.housingPrice.value) {
			case 'middle':
				return (ad.offer.price >= Filter.OFFER_PRICE_MIN && ad.offer.price <= Filter.OFFER_PRICE_MAX);
			case 'low': 
				return ad.offer.price < Filter.OFFER_PRICE_MIN;
			case 'high': 
				return ad.offer.price > Filter.OFFER_PRICE_MAX;
			default:
				return true;
		}
	};

	function filterByRooms(ad) {
		return filtersElement.housingRooms.value === Filter.FILTERED_DEFAULT_TYPE || ad.offer.rooms === +filtersElement.housingRooms.value;
	};

	const filterByGuests = (ad) => 
				filtersElement.housingGuests.value === Filter.FILTERED_DEFAULT_TYPE || ad.offer.guests === +filtersElement.housingGuests.value;

	const filterByFeatures = (ad) => {
		let featureElements = [];
		let checkedFeatures = mapFilters.querySelectorAll('#housing-features input:checked');
		checkedFeatures.forEach((element) => featureElements.push(element.value));
		return featureElements.every((item) => ad.offer.features.includes(item));
	}

	function filterOffers(data) {
		return data.filter(filterByType)
								.filter(filterByPrice)
								.filter(filterByRooms)
								.filter(filterByGuests)
								.filter(filterByFeatures);
	}

	function setCallback(cb) {
		externalFilterChangeCallback = cb;
	}

	// for(prop in filtersElement) {
	// 	filtersElement[prop].addEventListener('change', (evt) => {;
	// 		evt.preventDefault();
	
	// 		if(typeof externalFilterChangeCallback === 'function') {
	// 			externalFilterChangeCallback(); //сюда добавить debounce
	// 		}
	// 	});
	// }

	mapFilters.addEventListener('change', (evt) => {;
		evt.preventDefault();

		if(typeof externalFilterChangeCallback === 'function') {
			//externalFilterChangeCallback(); //сюда добавить debounce
			window.util.debounce(externalFilterChangeCallback)();
		}
	});


	window.filter = {
		filterOffers: filterOffers,
		setCallback: setCallback
	}
})();