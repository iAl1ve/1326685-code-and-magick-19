'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLOR = window.colorize.coat;
  var WIZARD_EYES_COLOR = window.colorize.eyes;

  var setupDialog = document.querySelector('.setup');
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


  addListWizard(similarListElement);
})();
