import { storageService } from "./async-storage.service.js";
import { saveToStorage, loadFromStorage, makeId } from "./util.service.js";

export const placeService = {
  getPlaces,
  removePlace,
  addPlace,
  getPlaceById,
};

const STORAGE_KEY = "places";
let gMap;
let gMarkers;
var gPlaces = [
  // {
  //   id: "1p2",
  //   lat: 32.086477115189666,
  //   lng: 34.797932645432276,
  //   name: "Tel-Aviv",
  // },
  // {
  //   id: "1p3",
  //   lat: 32.086477115189666,
  //   lng: 34.797932645432276,
  //   name: "Tel",
  // },
  // {
  //   id: "1p1",
  //   lat: 32.086477115189666,
  //   lng: 34.797932645432276,
  //   name: "Aviv",
  // },
];

_createPlaces();

async function getPlaces() {
  //return storageService.query(STORAGE_KEY);
  const places = await storageService.query(STORAGE_KEY);
  return places;
}

function removePlace(placeId) {
  return storageService.remove(placeId, STORAGE_KEY);
}

function addPlace(name, lat, lng, zoom) {
  return storageService.post(STORAGE_KEY, _createPlace(name, lat, lng, zoom));
}

function getPlaceById(placeId) {
  return storageService.get(STORAGE_KEY, placeId);
}

function _createPlace(
  name = "Eilat",
  lat = 29.55453025070841,
  lng = 34.95745611081883,
  zoom = 16
) {
  const place = {
    name,
    lat,
    lng,
    zoom,
    id: makeId(gPlaces.length),
  };

  return place;
}

function setMap() {}

function _createPlaces() {
  const places = loadFromStorage(STORAGE_KEY);
  if (places && places.length) return;

  gPlaces.push(_createPlace());
  _savePlacesToStorage();
}

function _savePlacesToStorage() {
  saveToStorage(STORAGE_KEY, gPlaces);
}

// function _mapProp(location = initialLocation) {
//   return {
//     center: new google.maps.LatLng(location.lat, location.lng),
//     zoom: 13,
//   };
// }

// function _mapMarker(position) {
//   console.log(position);
//   return new google.maps.Marker({
//     position,
//     map: gMap,
//     title: "Current Location",
//   });
// }
