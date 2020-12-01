export default class Search {
  static searchKeyword() {
    return fetch (`URLURLURL`)
      .then (function(response) {
        if (!response.ok) {
          throw Error(response.statusplaceholder);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}