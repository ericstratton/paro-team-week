import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Spotify from './../src/js/spotify.service.js';
import DiscogsService from './../src/js/discogs-services.js';


// Business Logic //


function printCard(obj) {
  $("#cardMenu").prepend(`<div class="album-data card col-4"><img class="card-img-top" src="${obj.cover}" alt="Cover Art for the Album ${obj.album}"><ul class="list-group list-group-flush"><li class="list-group-item">${obj.artist}</li><li class="list-group-item">${obj.album}</li><li class="list-group-item" id="${obj.ID}"></li></ul></div>`);
}

function buildAlbumObj(obj) {
  let artistInfo, albumInfo, albumLink, albumCover, albumID, spotifyData;
  artistInfo = obj.artists[0].name;
  albumInfo = obj.name;
  albumLink = obj.external_urls.spotify;
  albumCover = obj.images[0].url;
  albumID = obj.id;
  spotifyData = { artist: artistInfo, album: albumInfo, link: albumLink, cover: albumCover, ID: albumID};

  return spotifyData;
}

function formatSearch(keyword, searchOption) {
  let newKeyword = keyword.replace(/\s\s+/g, "%20");

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

function discogsRequest(artist, album, id) {
  DiscogsService.getDiscogs(artist, album)
    .then(function(response) {
      if (response.results.length > 0) {
        $("#vinylLink").html(`<h4>Purchase Album:</h4> <a href="https://www.discogs.com/master/${response.results[1].master_id}">Available on Discogs</a>`);
        $("#" + id).html(`<a href="https://www.discogs.com/master/${response.results[1].master_id}">Available on Discogs</a>`);
      } else {
        $("#vinylLink").html("<h5>Album not on Discogs</h5>");
        $("#" + id).html("Album not on Discogs");
      }
    });
}

function displayInfo(albumObj) {
  $("#featImage").html(`<img class="card-img-top" id="heroImage" src="${albumObj.cover}" alt="Cover Art for the Album ${albumObj.album}">`);
  $("#featWidget").html(`<iframe src="https://open.spotify.com/embed/album/${albumObj.ID}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
  $("#featArtist").html(`<h4>Artist Name:</h4> ${albumObj.artist}`);
  $("#featAlbum").html(`<h4>Album Name:</h4> ${albumObj.album}`);
  $("#featYear").html(`<h4>Release Year:</h4> ${albumObj.album}`);
  discogsRequest(albumObj.artist, albumObj.album, albumObj.ID);
}

function printNoResult() {
  $("#featImage").html(`<h2>No Result Found...</h2>`);
  $("#featWidget").html(" ");
  $("#featArtist").html(" ");
  $("#featAlbum").html(" ");
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
  $('#history').hide();

});
$('#homeButton').click (function() {
  $('#output').show();
  $('#body').show();
  $('#about').hide();
  $('#history').hide();

});
$('#historyButton').click (function() {
  $('#history').show();
  $('#body').hide();
  $('#output').hide();
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
          let randomNumAlbum = Math.floor(Math.random() * (response.albums.items.length));
          let albumsObj = response.albums.items[randomNumAlbum];
          let album = buildAlbumObj(albumsObj);
          printCard(album);
          displayInfo(album);
        } else {
          if (response.tracks.items.length > 0) {
            let randomNumTrack = Math.floor(Math.random() * (response.tracks.items.length));
            let tracksObj = response.tracks.items[randomNumTrack].album;
            let album = buildAlbumObj(tracksObj);
            printCard(album);
            displayInfo(album);
          } else {
            printNoResult();
          }
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});



