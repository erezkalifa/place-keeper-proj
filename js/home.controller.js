"use strict";

function showSection(section, event) {
  event.preventDefault();

  // מחביא את כל הסקשנים
  document
    .querySelectorAll("section")
    .forEach((sec) => sec.classList.add("hidden"));

  // מציג את הסקשן שנבחר
  document.getElementById(section).classList.remove("hidden");

  // עדכון המחלקה של body
  document.body.className = section === "map" ? "map-page" : "user-pref-page";
}
