import { mediaFactory } from "../factories/mediaFactory.js";
import { getPhotographerInfo } from "../utils/getPhotographerInfo.js";
import { getPhotographerMedia } from "../utils/getPhotographerMedia.js";
import { displayModal, closeModal } from "../utils/displayCloseModal.js";

// Fetch photographer info object
const photographerInfo = await getPhotographerInfo();

// Fetch photographer media array
const photographerMedia = await getPhotographerMedia();

// Initialize a variable that will contain the current lightbox media id
let currentLightboxMediaId = 0;

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
    <select class="dropdown" id="dropdownMenu" aria-label="Menu de tri">
      <option class="dropdown-options" value=""> Trier par </option>
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

function renderPhotographFooter(object) {
  // Destructuring the photographer info object to extract the photographer price
  const { price } = object;

  // Calculate total media likes count and store it in a variable
  const mediaLikeCount = document.querySelectorAll(".media-like-count");
  let totalMediaLikeCount = 0;

  mediaLikeCount.forEach((media) => {
    totalMediaLikeCount += Number(media.textContent);
  });

  // Create the HTML for the footer section
  const photographFooter = `
    <aside class="footer">
      <div class="footer-container">
        <span class="footer-likes" id="totalLikesCount">${totalMediaLikeCount}</span>
        <i class="fa-solid fa-heart"></i>
      </div>
      <p>${price} € / jour</p>
    </aside>
  `;

  // Add the footer section HTML to the footer element
  const footerEl = document.querySelector("footer");
  footerEl.innerHTML = photographFooter;
}

function insertPhotographName(object) {
  // Destructuring the photographer info object to extract the name property
  const { name } = object;

  // Add the photographer name to the modalTitle element
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML = `Contactez-moi<br>${name}`;
}

function validateModalForm(event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get the elements of the modal form & its inputs
  const modalForm = document.getElementById("modalForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // Check if the form input data is valid & console.log the data as an object
  if (modalForm.checkValidity()) {
    console.log({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      message: message.value,
    });
    modalForm.reset();
    closeModal("contactModal");
  }
}

async function renderLightBoxMedia(mediaId) {
  // Get the media object for the specified media id
  const mediaObject = await photographerMedia.find(
    (media) => media.id == mediaId
  );

  // Update the currentMediaId variable with the current lightbox media id
  currentLightboxMediaId = mediaId;

  // Destructuring the media object to extract its properties
  const { title, photographerId, image, video } = mediaObject;

  // Get the lightboxMedia element
  const lightboxMedia = document.getElementById("lightboxMedia");

  // If the media is an image add the appropriate media card html to the lightboxMedia element
  if (image) {
    lightboxMedia.innerHTML = `
      <img class="lightbox-img" src="assets/images/${photographerId}/${image}" alt="${title}">
      <figcaption class="lightbox-caption">${title}</figcaption>
  `;
  }

  // If the media is a video add the appropriate media card html to the lightboxMedia element
  if (video) {
    lightboxMedia.innerHTML = `
      <video class="lightbox-video" title="${title}" controls>
        <source src="assets/images/${photographerId}/${video}" type="video/mp4">
      </video>
      <figcaption class="lightbox-caption">${title}</figcaption>
  `;
  }
}

function nextLightBoxMedia() {
  // Find the index of the current media item in the photographerMedia array
  const currentIndex = photographerMedia.findIndex(
    (media) => media.id == currentLightboxMediaId
  );

  // If the current media item is not the last item in the array, display the next item
  if (currentIndex < photographerMedia.length - 1) {
    const nextMediaId = photographerMedia[currentIndex + 1].id;
    renderLightBoxMedia(nextMediaId);
    // Else display the first item of the array
  } else {
    const nextMediaId = photographerMedia[0].id;
    renderLightBoxMedia(nextMediaId);
  }
}

function previousLightBoxMedia() {
  // Find the index of the current media item in the photographerMedia array
  const currentIndex = photographerMedia.findIndex(
    (media) => media.id == currentLightboxMediaId
  );

  // If the current media item is not the first item in the array, display the previous item
  if (currentIndex > 0) {
    const previousMediaId = photographerMedia[currentIndex - 1].id;
    renderLightBoxMedia(previousMediaId);
    // Else display the last item of the array
  } else {
    const previousMediaId = photographerMedia[photographerMedia.length - 1].id;
    renderLightBoxMedia(previousMediaId);
  }
}

function renderLikes() {
  // Get the media like span element
  const mediaLikeSpanEl = this.parentNode.firstElementChild;

  // Get the media like icon element
  const mediaLikeIconEl = this.firstElementChild;

  if (mediaLikeIconEl.classList.contains("fa-regular")) {
    // Convert media like span content to a number and store it as mediaLikeCount variable
    let mediaLikeCount = Number(mediaLikeSpanEl.textContent);

    // Increment the mediaLikeCount variable
    mediaLikeCount++;

    // Define the mediaLikeCount value as media likes span element new content
    mediaLikeSpanEl.textContent = mediaLikeCount;

    // Render the photographer footer to recalculate the total likes count
    renderPhotographFooter(photographerInfo);

    // Replace the fa-regular with the fa-solid class
    mediaLikeIconEl.classList.replace("fa-regular", "fa-solid");
  } else if (mediaLikeIconEl.classList.contains("fa-solid")) {
    // Convert media like span content to a number and store it as mediaLikeCount variable
    let mediaLikeCount = Number(mediaLikeSpanEl.textContent);

    // Decrease the mediaLikeCount variable
    mediaLikeCount--;

    // Define the mediaLikeCount value as media likes span element new content
    mediaLikeSpanEl.textContent = mediaLikeCount;

    // Render the photographer footer to recalculate the total likes count
    renderPhotographFooter(photographerInfo);

    // Replace the fa-solid with the fa-regular class
    mediaLikeIconEl.classList.replace("fa-solid", "fa-regular");
  }
}

async function sortMediaSection() {
  // Retrieve the selected option value
  const selectedOption = this.value;

  // Sort the photographerMedia array using the likes key if the selected option is "Popularité"
  if (selectedOption == "Popularité") {
    await photographerMedia.sort((a, b) => {
      return b.likes - a.likes;
    });
  }

  // Sort the photographerMedia array using the date key if the selected option is "Date"
  if (selectedOption == "Date") {
    await photographerMedia.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  // Sort the photographerMedia array using the title key if the selected option is "Titre"
  if (selectedOption == "Titre") {
    await photographerMedia.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  // Remove the existing media section
  const mediaSection = document.querySelector(".media-section");
  mediaSection.remove();

  // Render the media article section using the sorted photographerMedia array
  renderMediaSection(photographerMedia);

  // Add an event listener to each media card button to open the lightbox modal on click
  const mediaCardButtons = document.querySelectorAll(".media-card-button");
  mediaCardButtons.forEach((card) => {
    card.addEventListener("click", () => {
      const mediaId = card.parentElement.id;
      renderLightBoxMedia(mediaId);
      displayModal("lightboxModal");
    });
  });

  // Add an event listener to each media card like button to execute the renderLikes function on click
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", renderLikes);
  });
}

function addEventListeners() {
  // Add an event listener to the dropdown menu to sort the media section on change
  const dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.addEventListener("change", sortMediaSection);

  // Add an event listener to the contact button to open the contact modal on click
  const contactBtn = document.getElementById("contactBtn");
  contactBtn.addEventListener("click", () => {
    displayModal("contactModal");
  });

  // Add an event listener to the close button in the modal to close the contact modal on click
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  modalCloseBtn.addEventListener("click", () => {
    closeModal("contactModal");
  });

  // Add an event listener to validate the contact modal form on submit
  const modalForm = document.getElementById("modalForm");
  modalForm.addEventListener("submit", validateModalForm);

  // Add an event listener to each media card button to open the lightbox modal on click
  const mediaCardButtons = document.querySelectorAll(".media-card-button");
  mediaCardButtons.forEach((card) => {
    card.addEventListener("click", () => {
      const mediaId = card.parentElement.id;
      renderLightBoxMedia(mediaId);
      displayModal("lightboxModal");
    });
  });

  // Add an event listener to each media card like button to execute the renderLikes function on click
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", renderLikes);
  });

  // Add an event listener to the close button in the lightbox modal to close the modal on click
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  lightboxCloseBtn.addEventListener("click", () => {
    closeModal("lightboxModal");
  });

  // Add an event listener to the previous button in the lightbox modal to switch to the previous media on click
  const previousBtn = document.getElementById("lightboxPreviousBtn");
  previousBtn.addEventListener("click", previousLightBoxMedia);

  // Add an event listener to the next button in the lightbox modal to switch to the next media on click
  const nextBtn = document.getElementById("lightboxNextBtn");
  nextBtn.addEventListener("click", nextLightBoxMedia);

  // Add an event listener to lightboxModal to switch to the previous/next media on press of left/right arrow keys
  document.addEventListener("keydown", (event) => {
    // Get the lightboxModal element
    const lightboxModal = document.getElementById("lightboxModal");

    // If lightboxModal is open & the left arrow key is pressed, call the previousLightBoxMedia function
    if (lightboxModal.open && event.key === "ArrowLeft") {
      previousLightBoxMedia();
    }

    // If lightboxModal is open & the right arrow key is pressed, call the nextLightBoxMedia function
    if (lightboxModal.open && event.key === "ArrowRight") {
      nextLightBoxMedia();
    }
  });

  // Add an event listener to the contact & lightbox modal to close the modal on press of ESC button
  document.addEventListener("keydown", (event) => {
    // If lightboxModal is open & the ESC key is pressed, call the closeModal function
    const lightboxModal = document.getElementById("lightboxModal");
    if (lightboxModal.open && event.key === "Escape") {
      closeModal("lightboxModal");
    }

    // If contactModal is open & the ESC key is pressed, call the closeModal function
    const contactModal = document.getElementById("contactModal");
    if (contactModal.open && event.key === "Escape") {
      closeModal("contactModal");
    }
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