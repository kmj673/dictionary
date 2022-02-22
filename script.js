"use strict";
const search = document.querySelector("#search");
const word = search.querySelector("#word");

function createUrl(e) {
  e.preventDefault();
  const formData = new FormData(search);
  const searchData = Object.fromEntries(formData);
  const url =
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchData.word;
  return url;
}
function renderWord(word) {
  console.log(word);
}

search.addEventListener("submit", (e) => {
  let url = createUrl(e);
  let promise = fetch(url)
    .then((response) => {
      if (!response.ok) new Error(response.status);
      return response.json();
    })
    .then((json) => json)
    .catch(console.error);
  promise.then((response) => {
    renderWord(response);
  });
});
