(function () {
	let adForm = document.querySelector(".ad-form");
	let adPhotoUpload = adForm.querySelector('.ad-form__upload');
	let adPhotoContainer = adForm.querySelector('.ad-form__photo-container');
	let adFileChooser = adPhotoUpload.querySelector('input[type=file]');
	let adPhotoDiv = adForm.querySelector('.ad-form__photo');
	
	
	// добавлять фотографии в контейнер ad-form__photo
	adFileChooser.addEventListener('change', () => {

		handleFiles(adFileChooser.files);
		// let file = adFileChooser.files[0];
		// let fileName = file.name.toLowerCase();
	
		// let matches = window.util.FILE_TYPE.some((it) => fileName.endsWith(it));
	
		// if (matches) {
		// 	let reader = new FileReader();
	
		// 	reader.addEventListener('load', (e) => {
		// 		addPhoto(adPhotoContainer, reader.result);
		// 	});
		// 	reader.readAsDataURL(file);
		// }
	});

	adPhotoUpload.addEventListener('dragenter', (e) => {
		e.stopPropagation();
		e.preventDefault();
	});

	adPhotoUpload.addEventListener('dragover', (e)=> {
		e.stopPropagation();
		e.preventDefault();
	});

	adPhotoUpload.addEventListener('drop', (e) => {
		e.stopPropagation();
		e.preventDefault();
		let dt = e.dataTransfer;
		let files = dt.files;
		handleFiles(files);

	});

	function handleFiles(files) {
		let file = files[0];
		let fileName = file.name.toLowerCase();
	
		let matches = window.util.FILE_TYPE.some((it) => fileName.endsWith(it));
	
		if (matches) {
			let reader = new FileReader();
	
			reader.addEventListener('load', (e) => {
				addPhoto(adPhotoContainer, reader.result);
			});
			reader.readAsDataURL(file);
		}
	}
	
	//создать элемент img, присвоить src выбранный файл, добавить его в div.ad-for__photo 
	//и добавить этот див в ad-form__photo-container
	function addPhoto(container, photoUrl) {
		let divPhoto = adPhotoDiv.cloneNode(true);
		divPhoto.style.overflow = 'hidden';
		let imgElement = document.createElement('img');
		imgElement.src = photoUrl;
		imgElement.style.overflow = 'hidden';
		// imgElement.width = '70';
		imgElement.height = '70';
	//	imgElement.width = 'auto';
		divPhoto.appendChild(imgElement);
	
		container.insertBefore(divPhoto, adPhotoDiv);
	}

	//TODO: drag-and-drop
})();