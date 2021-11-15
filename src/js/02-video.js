import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('iframe');
const player = new Vimeo.Player(iframeRef);

player.on('play', function () {
  console.log('played the video!');
});
player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
};

const iframeData = localStorage.getItem('videoplayer-current-time');
console.log(iframeData);
const parsedIframeData = JSON.parse(iframeData);
console.log(parsedIframeData);
const currentTime = parsedIframeData.seconds;
console.log(currentTime);

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

player.on('timeupdate', throttle(onPlay, 1000));
