export default class DiscogsService {
  static getDiscogs(artist, album) {
    return fetch(`https://api.discogs.com/database/search?release_title=${album}&artist=${artist}&per_page=3&page=1&key=gBjpBHKNGMmytdmHkzTg&secret=zwKGzLAJAIvhIPJocfrnFeYjqSbnvcKr`)
      .then (function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}