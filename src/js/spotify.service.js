export default class Spotify {
  static searchSpotify(keyword) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer BQDKJzr8bNIT4NaAq_Om9BSEM8QtFkBhyPqI4WIIDHxdzhVw7hzUV-dbWSwjOtO3DSI7gQU9ZMXsai-6BokiwB7F6PVjEqYJv6fv_lfCMmgsCUB3W2j2Pxnu4qnx__bm4OgorpV8Mrh_ZNWIM5uzVmK8AKPKQuPYqjE");
    myHeaders.append("Cookie", "_ga=GA1.2.456045822.1606765238; _gid=GA1.2.637614845.1606765238; sp_dc=AQB5RMpfdYpkmkJlRHPeYxSSfyTRPpkKySEvxhbkmixFgyFT0ZOlFeh5KY4xSVAXFpCp276qTTx4nbxD11fqn-6DnKhR9PuJ6yLMzkXUPg; sp_key=66b31764-29a3-4c2f-92c8-38ed42c7b352; _gat=1");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let type = "album,track";
    let limit = 1;
    return fetch(`https://api.spotify.com/v1/search?q=${keyword}&type=${type}&limit=${limit}`, requestOptions)
      .then ((response) => {
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