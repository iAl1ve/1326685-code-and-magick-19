'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileInput = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  var fileInputChange = function () {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }

  };

  window.avatar = {
    change: fileInputChange
  };
})();
