export function saveToStorage(key, val) {
  const strVal = JSON.stringify(val);
  localStorage.setItem(key, strVal);
}

export function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}

export function makeId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 5;
  let uniqueId = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters[randomIndex];
  }
  return `${length}${uniqueId}`;
}
