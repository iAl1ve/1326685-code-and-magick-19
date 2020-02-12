'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';
  var URL_POST = 'https://js.dump.academy/code-and-magick/';
  var URL_JSONP = 'https://js.dump.academy/code-and-magick/data?callback=getJSONPData';

  var StatusCode = {
    OK: 200,
    INVALID_REQUEST: 400,
    NOT_FOUND: 404
  };
  var TIMEOUT_IN_MS = 10000;
  var READY_STATE_LOAD = 4;

  var loadData = function (onLoad, onError) {
    // Если похожие волшебники сгенерированы, то завершаем функцию
    if (document.querySelector('.setup-similar-item')) {
      return;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK && xhr.readyState === READY_STATE_LOAD) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.INVALID_REQUEST:
          error = 'Неверный запрос ';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено ';
          break;
        default:
          error = 'Произошла ошибка соединения: ';
      }
      onError(error + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  var saveData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK && xhr.readyState === READY_STATE_LOAD) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка при отправке данных');
    });

    xhr.addEventListener('timeout', function () {
      onError('Данные не успели отправиться за ' + xhr.timeout + ' мс');
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  // Загрузка волшебников с помощью getJSONPData
  window.getJSONPData = function (data) {
    window.render.success(data);
  };

  var loadJSONPData = function () {
    // Если похожие волшебники сгенерированы, то завершаем функцию
    if (document.querySelector('.setup-similar-item')) {
      return;
    }
    var loader = document.createElement('script');
    loader.src = URL_JSONP;
    document.body.append(loader);
  };

  window.backend = {
    load: loadData,
    loadJSONP: loadJSONPData,
    save: saveData
  };

})();
