

'use strict';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserHome = document.querySelector('#images');
const previewHome = document.querySelector('.ad-form__photo img');
const fileChooserHandler = (fileChooser, preview) => {
  fileChooser.addEventListener('change', function () {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.setAttribute('data-src', preview.src);
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};
fileChooserHandler(fileChooserAvatar, previewAvatar);
fileChooserHandler(fileChooserHome, previewHome);

