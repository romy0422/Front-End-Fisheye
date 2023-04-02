import { mediaFactory } from "../factories/mediaFactory.js";
import { getPhotographerInfo } from "../utils/getPhotographerInfo.js";
import { getPhotographerMedia } from "../utils/getPhotographerMedia.js";
// Fetch photographer info object
const photographerInfo = await getPhotographerInfo();

// Fetch photographer media array
const photographerMedia = await getPhotographerMedia();

function renderPhotographHeader(object) {
  // Destructuring the photographer info object to extract to extract its properties
  const { name, city, country, tagline, portrait } = object;

  // Create the HTML for the header section
  const photographHeader = `
    <section class="photograph-header">
      <div class="photograph-info">
        <h1 class="photograph-name">${name}</h1>
        <p class="photograph-location">${city}, ${country}</p>
        <p class="photograph-tagline">${tagline}</p>
      </div>
      <button class="button" id="contactBtn" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
      <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
    </section>
  `;

  // Add the footer HTML to the main element
  const mainEl = document.querySelector("main");
  mainEl.innerHTML += photographHeader;
}
 
function renderDropdown() {
  // Create the HTML for the dropdown menu
  
  const dropdownHtml = `
  <h1 class="photograph-tagline">Trié part</h1>
    <select class="dropdown" id="dropdownMenu" aria-label="Menu de tri">
      <option class="dropdown-options" value="Popularité">Popularité</option>
      <option class="dropdown-options" value="Date">Date</option>
      <option class="dropdown-options" value="Titre">Titre</option>
    </select>
  `;

  // Add the dropdown HTML to the main element
  const mainEl = document.querySelector("main");
  mainEl.innerHTML += dropdownHtml;
}

function renderMediaSection(array) {
  // Create a new div element to hold the media cards
  const mediaSection = document.createElement("div");
  mediaSection.className = "media-section";

  // Append the media section to the main element
  const mainEl = document.querySelector("main");
  mainEl.append(mediaSection);

  // Iterate through each media item in the array
  array.forEach((media) => {
    // Create a media card model object from the media array
    const mediaCardModel = mediaFactory(media);
    // Get the DOM element for the media card
    const mediaCardDOM = mediaCardModel.getMediaCardDOM();
    // Add the card to the media section
    mediaSection.append(mediaCardDOM);
  });
}

async function renderPhotographMediaPage() {
  // Render the header section of the page with the photographer's name, location, tagline, and portrait
  await renderPhotographHeader(photographerInfo);

  // Render the dropdown menu
  await renderDropdown();

  // Render the media section of the page with cards for each media item
  await renderMediaSection(photographerMedia);

  // Render the footer section of the page with the photographer's likes and rate
  await renderPhotographFooter(photographerInfo);

  // Insert the photographer name in the modal title
  await insertPhotographName(photographerInfo);

  // Add all the event listeners
  addEventListeners();
}

// Render the entire photographer's media page with all its elements
renderPhotographMediaPage();