'use strict';

window.colorize = function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupPlayer = document.querySelector('.setup-player');
  var setupForm = document.querySelector('.setup-wizard-form');

  var changeCoatColor = function () {
    var coatColor = setupForm.querySelector('input[name="coat-color"]').value;
    var coatColorIndex = WIZARD_COAT_COLOR.indexOf(coatColor);

    coatColor = coatColorIndex === WIZARD_COAT_COLOR.length - 1 ? WIZARD_COAT_COLOR[0] : WIZARD_COAT_COLOR[coatColorIndex + 1];

    setupPlayer.querySelector('.wizard-coat').style.fill = coatColor;
    setupForm.querySelector('input[name="coat-color"]').value = coatColor;
  };

  var changeEyesColor = function () {
    var eyesColor = setupForm.querySelector('input[name="eyes-color"]').value;
    var eyesColorIndex = WIZARD_EYES_COLOR.indexOf(eyesColor);

    eyesColor = eyesColorIndex === WIZARD_EYES_COLOR.length - 1 ? WIZARD_EYES_COLOR[0] : WIZARD_EYES_COLOR[eyesColorIndex + 1];

    setupPlayer.querySelector('.wizard-eyes').style.fill = eyesColor;
    setupForm.querySelector('input[name="eyes-color"]').value = eyesColor;
  };

  var changeFireballColor = function () {
    var fireballColor = setupForm.querySelector('input[name="fireball-color"]').value;
    var fireballColorIndex = WIZARD_FIREBALL_COLOR.indexOf(fireballColor);

    fireballColor = fireballColorIndex === WIZARD_FIREBALL_COLOR.length - 1 ? WIZARD_FIREBALL_COLOR[0] : WIZARD_FIREBALL_COLOR[fireballColorIndex + 1];

    setupPlayer.querySelector('.setup-fireball-wrap').style.background = fireballColor;
    setupForm.querySelector('input[name="fireball-color"]').value = fireballColor;
  };

  return {
    coat: WIZARD_COAT_COLOR,
    eyes: WIZARD_EYES_COLOR,
    changeCoat: changeCoatColor,
    changeEyes: changeEyesColor,
    changeFireball: changeFireballColor
  };
}();
