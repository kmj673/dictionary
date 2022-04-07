"use strict";
const search = document.querySelector("#search");
const word = document.querySelector("#word");
const searchWord = document.querySelector(".searchWord");
const searchPhonetic = document.querySelector(".searchPhonetic");
const searchMeaning = document.querySelector(".searchMeaning");

function createUrl(e) {
  e.preventDefault();
  const formData = new FormData(search);
  const searchData = Object.fromEntries(formData);
  const url =
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchData.word;
  return url;
}
function renderWord(response) {
  searchWord.innerHTML = "";
  searchPhonetic.innerHTML = "";
  searchMeaning.innerHTML = "";
  let search = response[0];
  let { word, meanings, phonetic } = search;
  searchWord.innerHTML = word;
  let speaker = document.createElement("span");
  speaker.setAttribute("style", "cursor:pointer");
  speaker.innerText = " 🔊";
  searchPhonetic.innerHTML = `${phonetic} `;
  searchPhonetic.appendChild(speaker);
  meanings.map((meaning) => {
    let part = document.createElement("p");
    part.innerText = `${meaning.partOfSpeech}`;
    searchMeaning.appendChild(part);
    meaning.definitions.map((x) => {
      let definition = document.createElement("li");
      definition.innerText = `${x.definition}`;
      definition.setAttribute("type", "1");
      part.appendChild(definition);
    });
  });
}

search.addEventListener("submit", (e) => {
  let url = createUrl(e);
  word.value = "";
  fetch(url)
    .then((response) => {
      if (!response.ok) new Error(response.status);
      return response.json();
    })
    .then((json) => {
      renderWord(json);
    })
    .catch(console.error);
});
