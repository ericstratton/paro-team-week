import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Spotify from './../src/js/spotify.service.js';
import DiscogsService from './../src/js/discogs-services.js';


// Business Logic //

function buildAlbumObj(obj) {
  let artistInfo, albumInfo, albumLink, albumCover, albumID, spotifyData;
  artistInfo = obj.artists[0].name;
  albumInfo = obj.name;
  albumLink = obj.external_urls.spotify;
  albumCover = obj.images[0].url;
  albumID = obj.id;
  spotifyData = { artist: artistInfo, album: albumInfo, link: albumLink, cover: albumCover, ID: albumID };
  return spotifyData;
}

function formatSearch(keyword, searchOption) {
  let newKeyword = keyword.replace(/\s\s+/g, "%20");
  console.log(newKeyword);

  if (searchOption === "genre") {
    return ("%20genre:%22" + newKeyword + "%22");
  } else if (searchOption === "artist") {
    return ("%20artist:%22" + newKeyword + "%22");
  } else if (searchOption === "album") {
    return (newKeyword);
  } else if (searchOption === "hipster") {
    return ("%20tag:hipster%20%22" + newKeyword + "%22");
  }
}

function discogsRequest(artist, album) {
  DiscogsService.getDiscogs(artist, album)
    .then(function(response) {
      console.log(response.results[1].master_id);
      $("#output").html(`<a href="https://www.discogs.com/master/${response.results[1].master_id}">Click here</a>`);
    });
}

function displayInfo(albumObj) {
  $(".card").prepend(`<img class="card-img-top" src="${albumObj.cover}" alt="Cover Art for the Album ${albumObj.album}">`);
  discogsRequest(albumObj.artist, albumObj.album);
  $("#widget").html(`<iframe src="https://open.spotify.com/embed/album/${albumObj.ID}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
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
    let search, searchOption;
    search = $("#searchTerm").val();
    searchOption = $("#searchOption").val();

    Spotify.searchSpotify(formatSearch(search, searchOption))
      .then(function(response) {
        if (response instanceof Error) {
          throw Error(`Spotify API error -- ${response.message}`);
        }
        if (searchOption != "genre") {
          console.log(response);
          let albumsObj = response.albums.items[0];
          let album = buildAlbumObj(albumsObj);
          console.log(album);
          displayInfo(album);
        } else {
          console.log(response);
          let tracksObj = response.tracks.items[0].album;
          let album = buildAlbumObj(tracksObj);
          console.log(album);
          displayInfo(album);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});



