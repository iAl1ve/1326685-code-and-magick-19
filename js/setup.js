'use strict';

(function () {
  var setupDialog = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupSubmit = document.querySelector('.setup-submit');
  var setupPlayer = document.querySelector('.setup-player');
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');
  var startSetupDialogPosition = {
    x: 0,
    y: 0
  };

  // Закрытие формы по нажатию ESC
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSetupDialog);
  };

  var openSetupDialog = function () {
    setupDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupPlayer.querySelector('.wizard-coat').addEventListener('click', window.colorize.changeCoat);
    setupPlayer.querySelector('.wizard-eyes').addEventListener('click', window.colorize.changeEyes);
    setupPlayer.querySelector('.setup-fireball').addEventListener('click', window.colorize.changeFireball);
    setupClose.addEventListener('click', closeSetupDialog);
    setupClose.addEventListener('keydown', onEnterPressClose);
    setupSubmit.addEventListener('click', onSubmitFormSetup);
    setupSubmit.addEventListener('keydown', onEnterSubmitFormSetup);
    setupOpen.removeEventListener('click', openSetupDialog);
    setupOpen.removeEventListener('keydown', onEnterPressOpen);
    dialogHandler.addEventListener('mousedown', window.dialog.move);
    setupDialog.querySelector('.setup-similar').classList.remove('hidden');
    startSetupDialogPosition.x = setupDialogElement.style.left;
    startSetupDialogPosition.y = setupDialogElement.style.top;
  };

  var closeSetupDialog = function () {
    setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('click', closeSetupDialog);
    setupClose.removeEventListener('keydown', onEnterPressClose);
    setupPlayer.querySelector('.wizard-coat').removeEventListener('click', window.colorize.changeCoat);
    setupPlayer.querySelector('.wizard-eyes').removeEventListener('click', window.colorize.changeEyes);
    setupPlayer.querySelector('.setup-fireball').removeEventListener('click', window.colorize.changeFireball);
    setupSubmit.removeEventListener('click', onSubmitFormSetup);
    setupSubmit.removeEventListener('keydown', onEnterSubmitFormSetup);
    dialogHandler.removeEventListener('mousedown', window.dialog.move);
    setupOpen.addEventListener('click', openSetupDialog);
    setupOpen.addEventListener('keydown', onEnterPressOpen);
    setupDialog.querySelector('.setup-similar').classList.add('hidden');
    setupDialogElement.style.left = startSetupDialogPosition.x;
    setupDialogElement.style.top = startSetupDialogPosition.y;
  };

  var onSubmitFormSetup = function () {
    setupForm.submit();
    setupSubmit.removeEventListener('click', onSubmitFormSetup);
    setupSubmit.removeEventListener('keydown', onEnterSubmitFormSetup);
  };

  var onEnterSubmitFormSetup = function (evt) {
    window.util.isEnterEvent(evt, onSubmitFormSetup);
  };

  var onEnterPressOpen = function (evt) {
    window.util.isEnterEvent(evt, openSetupDialog);
  };

  var onEnterPressClose = function (evt) {
    window.util.isEnterEvent(evt, closeSetupDialog);
  };

  // Обрабатываем события открытие окна с настройкой персонажа
  setupOpen.addEventListener('click', openSetupDialog);
  setupOpen.addEventListener('keydown', onEnterPressOpen);
})();
