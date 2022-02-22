"use strict";
const search = document.querySelector("#search");
const word = search.querySelector("#word");

function fetchFn() {
  const formData = new FormData(search);
  const searchData = Object.fromEntries(formData);
  const url =
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchData.word;
  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) new Error(response.status);
      return response.json();
    })
    .then((json) => JSON.stringify(json))
    .catch(console.error);
}

search.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchFn();
  word.value = "";
});
