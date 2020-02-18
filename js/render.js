'use strict';

(function () {
  var MAX_COUNT_SIMILAR_WIZARDS = 4;
  var allWizards = [];
  var coatColor;
  var eyesColor;

  var setupDialog = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');
  var similarListElement = setupDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var onShowWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    var count = wizards.length > MAX_COUNT_SIMILAR_WIZARDS ? MAX_COUNT_SIMILAR_WIZARDS : wizards.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < count; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var updateWizards = function () {
    onShowWizards(allWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    coatColor = setupForm.querySelector('input[name="coat-color"]').value;
    updateWizards();
  });

  var onCoatChange = window.debounce(function (color) {
    coatColor = color;
    eyesColor = setupForm.querySelector('input[name="eyes-color"]').value;
    updateWizards();
  });

  var onSuccessLoad = function (wizards) {
    allWizards = wizards;
    updateWizards();
  };

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = '30%';
    node.style.bottom = '50%';
    node.style.right = '30%';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  window.render = {
    success: onSuccessLoad,
    error: onErrorLoad,
    eyes: onEyesChange,
    coat: onCoatChange,
  };
}());
