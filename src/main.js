import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Spotify from './../src/js/spotify.service.js';

$(document).ready(function() {

  $("#input").on("submit", function(e) {
    e.preventDefault();
    let search = $("#searchTerm").val();

    Spotify.searchSpotify(search)
      .then(function(response) {
        if (response instanceof Error) {
          throw Error(`Spotify API error -- ${response.message}`);
        }
        let artistInfo, albumInfo, spotifyData;
        artistInfo = response.albums.items[0].artists[0].name;
        albumInfo = response.albums.items[0].name;
        spotifyData = {artist: artistInfo, album: albumInfo};

        console.log(spotifyData);
        return spotifyData;
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});