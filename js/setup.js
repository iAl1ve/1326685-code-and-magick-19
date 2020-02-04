'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var KEY_ESC = 27;
var KEY_ENTER = 13;

var setupDialog = document.querySelector('.setup');
var setupForm = document.querySelector('.setup-wizard-form');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupSubmit = document.querySelector('.setup-submit');
var setupPlayer = document.querySelector('.setup-player');


var similarListElement = setupDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// Генерируем случайное целое число в диапазоне, включая минимальное и максимальное, для генерации свойств персонажа
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Генерируем случайное имя персонажа, если mode = 0(false), то меняем местами имя и фамилию
var getRandomName = function (mode) {
  var fullName = mode ? WIZARD_NAMES[getRandomInRange(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInRange(0, WIZARD_SURNAMES.length - 1)] : WIZARD_SURNAMES[getRandomInRange(0, WIZARD_SURNAMES.length - 1)] + ' ' + WIZARD_NAMES[getRandomInRange(0, WIZARD_NAMES.length - 1)];
  return fullName;
};

var wizards = [
  {
    name: getRandomName(getRandomInRange(0, 1)),
    coatColor: WIZARD_COAT_COLOR[getRandomInRange(0, WIZARD_COAT_COLOR.length - 1)],
    eyesColor: WIZARD_EYES_COLOR[getRandomInRange(0, WIZARD_EYES_COLOR.length - 1)]
  },
  {
    name: getRandomName(getRandomInRange(0, 1)),
    coatColor: WIZARD_COAT_COLOR[getRandomInRange(0, WIZARD_COAT_COLOR.length - 1)],
    eyesColor: WIZARD_EYES_COLOR[getRandomInRange(0, WIZARD_EYES_COLOR.length - 1)]
  },
  {
    name: getRandomName(getRandomInRange(0, 1)),
    coatColor: WIZARD_COAT_COLOR[getRandomInRange(0, WIZARD_COAT_COLOR.length - 1)],
    eyesColor: WIZARD_EYES_COLOR[getRandomInRange(0, WIZARD_EYES_COLOR.length - 1)]
  },
  {
    name: getRandomName(getRandomInRange(0, 1)),
    coatColor: WIZARD_COAT_COLOR[getRandomInRange(0, WIZARD_COAT_COLOR.length - 1)],
    eyesColor: WIZARD_EYES_COLOR[getRandomInRange(0, WIZARD_EYES_COLOR.length - 1)]
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var addListWizard = function (ListElement) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  ListElement.appendChild(fragment);
};

// Закрытие формы по нажатию ESC
var onPopupEscPress = function (evt) {
  if (evt.target.className !== 'setup-user-name') {
    if (evt.keyCode === KEY_ESC) {
      closeSetupDialog();
    }
  }
};

var openSetupDialog = function () {
  setupDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupPlayer.querySelector('.wizard-coat').addEventListener('click', onChangeCoatColor);
  setupPlayer.querySelector('.wizard-eyes').addEventListener('click', onChangeEyesColor);
  setupPlayer.querySelector('.setup-fireball').addEventListener('click', onChangeFireballColor);
  setupClose.addEventListener('click', closeSetupDialog);
  setupClose.addEventListener('keydown', onEnterPressClose);
  setupSubmit.addEventListener('click', onSubmitFormSetup);
  setupSubmit.addEventListener('keydown', onEnterSubmitFormSetup);
  setupOpen.removeEventListener('click', openSetupDialog);
  setupOpen.removeEventListener('keydown', onEnterPressOpen);
};

var closeSetupDialog = function () {
  setupDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupClose.removeEventListener('click', closeSetupDialog);
  setupClose.removeEventListener('keydown', onEnterPressClose);
  setupPlayer.querySelector('.wizard-coat').removeEventListener('click', onChangeCoatColor);
  setupPlayer.querySelector('.wizard-eyes').removeEventListener('click', onChangeEyesColor);
  setupPlayer.querySelector('.setup-fireball').removeEventListener('click', onChangeFireballColor);
  setupSubmit.removeEventListener('click', onSubmitFormSetup);
  setupSubmit.removeEventListener('keydown', onEnterSubmitFormSetup);
  setupOpen.addEventListener('click', openSetupDialog);
  setupOpen.addEventListener('keydown', onEnterPressOpen);
};

var onSubmitFormSetup = function () {
  setupForm.submit();
  setupSubmit.removeEventListener('click', onSubmitFormSetup);
  setupSubmit.removeEventListener('keydown', onEnterSubmitFormSetup);
};

var onEnterSubmitFormSetup = function (evt) {
  if (evt.keyCode === KEY_ENTER) {
    onSubmitFormSetup();
  }
};

var onEnterPressOpen = function (evt) {
  if (evt.keyCode === KEY_ENTER) {
    openSetupDialog();
  }
};

var onEnterPressClose = function (evt) {
  if (evt.keyCode === KEY_ENTER) {
    closeSetupDialog();
  }
};

var onChangeCoatColor = function () {
  var coatColor = setupForm.querySelector('input[name="coat-color"]').value;
  var coatColorIndex = WIZARD_COAT_COLOR.indexOf(coatColor);

  coatColor = coatColorIndex === WIZARD_COAT_COLOR.length - 1 ? WIZARD_COAT_COLOR[0] : WIZARD_COAT_COLOR[coatColorIndex + 1];

  setupPlayer.querySelector('.wizard-coat').style.fill = coatColor;
  setupForm.querySelector('input[name="coat-color"]').value = coatColor;
};

var onChangeEyesColor = function () {
  var eyesColor = setupForm.querySelector('input[name="eyes-color"]').value;
  var eyesColorIndex = WIZARD_EYES_COLOR.indexOf(eyesColor);

  eyesColor = eyesColorIndex === WIZARD_EYES_COLOR.length - 1 ? WIZARD_EYES_COLOR[0] : WIZARD_EYES_COLOR[eyesColorIndex + 1];

  setupPlayer.querySelector('.wizard-eyes').style.fill = eyesColor;
  setupForm.querySelector('input[name="eyes-color"]').value = eyesColor;
};

var onChangeFireballColor = function () {
  var fireballColor = setupForm.querySelector('input[name="fireball-color"]').value;
  var fireballColorIndex = WIZARD_FIREBALL_COLOR.indexOf(fireballColor);

  fireballColor = fireballColorIndex === WIZARD_FIREBALL_COLOR.length - 1 ? WIZARD_FIREBALL_COLOR[0] : WIZARD_FIREBALL_COLOR[fireballColorIndex + 1];

  setupPlayer.querySelector('.setup-fireball-wrap').style.background = fireballColor;
  setupForm.querySelector('input[name="fireball-color"]').value = fireballColor;
};

// Обрабатываем события открытие окна с настройкой персонажа
setupOpen.addEventListener('click', openSetupDialog);
setupOpen.addEventListener('keydown', onEnterPressOpen);


addListWizard(similarListElement);
setupDialog.querySelector('.setup-similar').classList.remove('hidden');

