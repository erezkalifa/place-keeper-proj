import { placeService } from "./services/place.service.js";

window.app = {
  onInit,
  onRemovePlace,
  onPanToPlace,
};

let gMap;
let gMarkers = [];

function onInit() {
  if (document.body.classList.contains("map-page")) {
    renderPlaces();
    initMap();
    renderMarkers();
  }
}

async function renderPlaces() {
  const places = await placeService.getPlaces();
  const strHtmls = places.map(
    (place) =>
      `<li>${place.name} 
    <button onClick="app.onRemovePlace('${place.id}')">X</button>
    <button onClick="app.onPanToPlace('${place.id}')">GO</button>
</li>`
  );

  document.querySelector(".places").innerHTML = strHtmls.join("");
}

function initMap() {
  if (!document.body.classList.contains("map-page")) return;

  gMap = _setMap();
  _mapMarker();

  gMap.addListener("click", (ev) => {
    const name = prompt("Place name?");
    if (name)
      onAddPlace(name, ev.latLng.lat(), ev.latLng.lng(), gMap.getZoom());
    renderPlaces();
  });
}

async function onRemovePlace(placeId) {
  await placeService.removePlace(placeId);
  renderMarkers();
  renderPlaces();
}

async function renderMarkers() {
  const places = await placeService.getPlaces();

  gMarkers.forEach((marker) => marker.setMap(null));

  gMarkers = [];

  if (places.length) {
    gMarkers = places.map((place) => {
      return new google.maps.Marker({
        position: place,
        map: gMap,
        title: place.name,
      });
    });
  }
}

async function onAddPlace(name, lat, lng, zoom) {
  await placeService.addPlace(name, lat, lng, zoom);
  renderMarkers();
  renderPlaces();
}
async function onPanToPlace(placeId) {
  const place = await placeService.getPlaceById(placeId);
  const { lat, lng } = place;
  gMap.setCenter({ lat, lng });
  gMap.setZoom(place.zoom);
}

function _setMap(
  location = { lat: 29.55453025070841, lng: 34.95745611081883 }
) {
  return new google.maps.Map(
    document.getElementById("googleMap"),
    _mapProp(location)
  );
}

function _mapProp(
  location = { lat: 29.55453025070841, lng: 34.95745611081883 }
) {
  return {
    center: new google.maps.LatLng(location.lat, location.lng),
    zoom: 13,
  };
}

function _mapMarker(
  position = { lat: 29.55453025070841, lng: 34.95745611081883 }
) {
  const marker = new google.maps.Marker({
    position,
    map: gMap,
    title: "Current Location",
  });

  gMarkers.push(marker);
}
