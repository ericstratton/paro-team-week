import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Spotify from './../src/js/spotify.service.js';
import DiscogsService from './../src/js/discogs-services.js';


// Business Logic //

function discogsRequest(artist, album) {
  DiscogsService.getDiscogs(artist, album)
    .then(function(response) {
      console.log(response.results[1].master_id);
      $("#output").html(`<a href="https://www.discogs.com/master/${response.results[1].master_id}">Click here</a>`)
    });
}

// User Interface Logic //

$(document).ready(function() {

  $("#input").on("submit", function(e) {
    e.preventDefault();
    let search = $("#searchTerm").val();

    Spotify.searchSpotify(search)
      .then(function(response) {
        if (response instanceof Error) {
          throw Error(`Spotify API error -- ${response.message}`);
        }
        let artistInfo, albumInfo, albumLink, albumCover, spotifyData;
        artistInfo = response.albums.items[0].artists[0].name;
        albumInfo = response.albums.items[0].name;
        albumLink = response.albums.items[0].external_urls.spotify;
        albumCover = response.albums.items[0].images[0].url;
        spotifyData = {artist: artistInfo, album: albumInfo, link: albumLink, cover: albumCover};

        discogsRequest(spotifyData.artist, spotifyData.album);

        console.log(spotifyData);

      })
      .catch(function(err) {
        console.log(err);
      });
  });
});



