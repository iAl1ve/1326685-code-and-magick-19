'use strict';

window.util = function () {
  var KEY_ESC = 27;
  var KEY_ENTER = 13;

  // Закрытие формы по нажатию ESC
  var onEscPress = function (evt, action) {
    if (evt.target.className !== 'setup-user-name') {
      if (evt.keyCode === KEY_ESC) {
        action();
      }
    }
  };

  var onEnterPress = function (evt, action) {
    if (evt.keyCode === KEY_ENTER) {
      action();
    }
  };

  return {
    isEscEvent: onEscPress,
    isEnterEvent: onEnterPress
  };
}();
