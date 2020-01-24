'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_SHADOW = 10;
var GAP_BAR = 50;
var GAP_SPACING = 30;
var FONT_GAP = 20;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
// Ищем максимальное значение
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};
// Генерируем случайное целое число в диапазоне, включая минимальное и максимальное
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  // Отрисовываем текст
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + GAP_SPACING);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + GAP_SPACING + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    // Округляем по условию задачи
    times[i] = Math.round(times[i]);
    var lineBar = Math.round(BAR_HEIGHT * times[i] / maxTime);

    // Устанавливаем цвет текста и пишем результаты
    ctx.fillStyle = '#000';
    ctx.fillText(times[i], CLOUD_X + TEXT_WIDTH + (GAP_BAR + BAR_WIDTH) * i, CLOUD_HEIGHT - lineBar - CLOUD_Y * 3);
    ctx.fillText(players[i], CLOUD_X + TEXT_WIDTH + (GAP_BAR + BAR_WIDTH) * i, CLOUD_HEIGHT - CLOUD_Y);

    // Меняем цвет гистограммы и затем рисуем её
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + getRandomInRange(0, 100) + '%,50%)';
    }
    ctx.fillRect(CLOUD_X + TEXT_WIDTH + (GAP_BAR + BAR_WIDTH) * i, CLOUD_HEIGHT - lineBar - CLOUD_Y * 2, BAR_WIDTH, lineBar - CLOUD_Y * 2);
  }
};
