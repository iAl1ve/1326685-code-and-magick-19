'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var KEY_ESC = 27;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

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

// Функция закрытия окна с настройками персонажа
var pressingClickClose = function () {
  userDialog.classList.add('hidden');
  buttonClose.removeEventListener('click', pressingClickClose);
};
var buttonClose = document.querySelector('.setup-close');
// Добавим событие на закрытие окна с настройкой персонажа
buttonClose.addEventListener('click', pressingClickClose);
// Закрытие формы по нажатию ESC
var pressingClickEsc = function (evt) {
  // Проверяем, что код клавиши равен 27 - ESC
  if (evt.keyCode === KEY_ESC) {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', pressingClickEsc);
  }
};
document.addEventListener('keydown', pressingClickEsc);

addListWizard(similarListElement);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
