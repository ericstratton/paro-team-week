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
      $("#output").html(`<a href="https://www.discogs.com/master/${response.results[1].master_id}">Click here</a>`);
    });
}

function spotifyPlayback(albumID) {
  $("#widget").html(`<iframe src="https://open.spotify.com/embed/album/${albumID}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
}

// User Interface Logic //

$('#readMore').click (function() {
  $('#intro').fadeOut();
  $('#output').fadeIn();
  $('#body').fadeIn();
  $('#navbar').fadeIn();
});
$('#aboutButton').click (function() {
  $('#body').hide();
  $('#output').hide();
  $('#about').show();
});
$('#homeButton').click (function() {
  $('#output').show();
  $('#body').show();
  $('#about').hide();
});

$(document).ready(function() {

  $("#input").on("submit", function(e) {
    e.preventDefault();
    let search = $("#searchTerm").val();

    Spotify.searchSpotify(search)
      .then(function(response) {
        if (response instanceof Error) {
          throw Error(`Spotify API error -- ${response.message}`);
        }
        let artistInfo, albumInfo, albumLink, albumCover, spotifyData, albumID;
        artistInfo = response.albums.items[0].artists[0].name;
        albumInfo = response.albums.items[0].name;
        albumLink = response.albums.items[0].external_urls.spotify;
        albumCover = response.albums.items[0].images[0].url;
        albumID = response.albums.items[0].id;
        spotifyData = {artist: artistInfo, album: albumInfo, link: albumLink, cover: albumCover, ID: albumID};

        // Make Discogs request with album retrieved from Spotify (callback) // 
        discogsRequest(spotifyData.artist, spotifyData.album);
        // Place Spotify widget into webpage with album retrieved from Spotify API (callback) //
        spotifyPlayback(spotifyData.ID);

        console.log(spotifyData);

      })
      .catch(function(err) {
        console.log(err);
      });
  });
});



