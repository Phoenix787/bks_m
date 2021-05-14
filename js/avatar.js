(function () {

	//const FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
	let avatarUpload = document.querySelector('.ad-form-header__upload');
	let avatarChooserField = avatarUpload.querySelector('.ad-form__field input[type=file]');
	let avatarPreview = avatarUpload.querySelector('.ad-form-header__preview img');
	let dropZone = avatarUpload.querySelector('.ad-form__field');

	avatarChooserField.addEventListener('change', () => {
		window.util.handleFiles(avatarChooserField.files, avatarPreview);
	});

	dropZone.addEventListener('dragenter',  (e) => {
		e.stopPropagation();
		e.preventDefault();
	});

	dropZone.addEventListener('dragover', (e) => {
		e.stopPropagation();
		e.preventDefault();
	});

	dropZone.addEventListener('drop', (e) => {
		e.stopPropagation();
		e.preventDefault();
		let dt = e.dataTransfer;
		let files = dt.files;

		window.util.handleFiles(files, avatarPreview);
	});

	// function handleFiles(files) {
	// 	let file = files[0];
	// 	let fileName = file.name.toLowerCase();
	
	// 	let matches = window.util.FILE_TYPE.some((it) => fileName.endsWith(it));
	
	// 	if (matches) {
	// 		let reader = new FileReader();
	// 		reader.addEventListener('load', (e) => {
	// 			avatarPreview.src = reader.result;
	// 		});
	// 		reader.readAsDataURL(file);
	// 	}
	// }
})();

