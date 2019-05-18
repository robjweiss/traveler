const loadGoogleMapsApi = require('load-google-maps-api');

class Map {
  static loadGoogleMapsApi() {
    return loadGoogleMapsApi({ key: "AIzaSyDQO74hK0UhzAo_NZMwauoGM2FHP8khGTk" });
  }

  static createMap(googleMaps, mapElement) {
    return new googleMaps.Map(mapElement, {
      center: { lat: 39.8283, lng: -98.5795 }, //center of us
      zoom: 3.5
    });
  }
}

export { Map };