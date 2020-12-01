import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SpotifyWebApi from 'spotify-web-api-js';

let spotify = new SpotifyWebApi();


$(document).ready(function() {
  console.log("In document . ready");
  spotify.setAccessToken('[Key]');
  spotify.getArtistAlbums('alt-J', function (err, data) {
    if (err) console.error(err);
    else console.log('Artist albums', data);
  });
});