import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer [<ENTER ACCESS TOKEN>]);
  myHeaders.append("Cookie", "_ga=GA1.2.456045822.1606765238; _gid=GA1.2.637614845.1606765238; sp_dc=AQB5RMpfdYpkmkJlRHPeYxSSfyTRPpkKySEvxhbkmixFgyFT0ZOlFeh5KY4xSVAXFpCp276qTTx4nbxD11fqn-6DnKhR9PuJ6yLMzkXUPg; sp_key=66b31764-29a3-4c2f-92c8-38ed42c7b352; _gat=1");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let type = "artist";

  $("#input").on("submit", function(e) {
    e.preventDefault();
    let artist = $("#searchTerm").val();
    fetch(`https://api.spotify.com/v1/search?q=${artist}&type=${type}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  });
});

// import SpotifyWebApi from 'spotify-web-api-js';
// let spotify = new SpotifyWebApi();
// spotify.setAccessToken('BQC2SS3L4MYZlqSy58ItenwwoDsV9Q66mXQ1zXP1n3q_oyXB1yNimy9XjmhmjNHJA2QuH5vfMsoUPX7p1aKBM33IbSPD5zL7JqXWHRxezapUcuOzHMJ4SG4X9eyjhTFZ4JpeTZCuWJOABKzF');
// spotify.getArtistAlbums('alt-J', function (err, data) {
//   if (err) console.error(err);
//   else console.log('Artist albums', data);
// });