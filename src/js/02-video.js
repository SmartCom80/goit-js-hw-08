const STORAGE_KEY = 'videoplayer-current-time';
const player = new Vimeo.Player('vimeo-player');
let currentTime = 0;

// Запрашиваем у пользователя, нужно ли продолжить просмотр видео с места последней остановки. Устанавливаем текушее время видео.
onSetTimePlayer();

// Запускаем слушатель событий на метод обновления времени просмотра timeupdate
onListenerPlay();

// 1. Функция проверки реакции пользователя и установку точки в сохраненную позицию или в начало
function onSetTimePlayer() {
  let setTime = 0;
  let result = confirm(
    'If you want to start watching again, please click OK. Otherwise, watching will continue from where you left off last time.'
  );

  if (!result) {
    setTime = Number(localStorage.getItem(STORAGE_KEY));
  }

  //   console.log('setTime :>> ', setTime);
  player.setCurrentTime(setTime);
}

// 2. Функция установки прослушивателя на событие timeupdate
function onListenerPlay() {
  player.on('timeupdate', function () {
    //  console.log('CurrentTime the video!');
    onGetCurrentTime();
    onWriteStorage(currentTime);
  });
}

// 3. Функция получения текущего времени произведения видео
function onGetCurrentTime() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      // seconds = the current playback position
      // console.log('seconds :>> ', seconds);
      return (currentTime = seconds);
    })
    .catch(function (error) {
      // an error occurred
      console.log('error :>> ', error);
    });
}

// 4. Функция сохранения текущего времени воспроизведения в localStorage
function onWriteStorage(value) {
  //   console.log('currentValue :>> ', value);
  const item = localStorage.setItem(STORAGE_KEY, Math.floor(value));
  _.throttle(item, 1000);
}
