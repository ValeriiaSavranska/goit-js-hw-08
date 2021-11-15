import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('iframe');
const iframePlayer = new Vimeo.Player(iframeRef);

iframePlayer.on('play', function () {
  console.log('played the video!');
});
iframePlayer.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
};

const iframeData = localStorage.getItem('videoplayer-current-time');
const parsedIframeData = JSON.parse(iframeData);
const currentTime = parsedIframeData.seconds;

iframePlayer
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

iframePlayer.on('timeupdate', throttle(onPlay, 1000));
