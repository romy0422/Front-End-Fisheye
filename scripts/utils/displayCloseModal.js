export function displayModal(modalName) {
    // Get the modal element
    const modal = document.getElementById(modalName);
    // Get the header, main and footer elements
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
  
    // Display the modal
    modal.showModal();
    modal.style.display = "flex";
    // Set the aria-hidden attribute of the modal to false to indicate that it is visible
    modal.setAttribute("aria-hidden", "false");
    // Set the aria-hidden attribute of the header, main and footer elements to true to indicate that they are hidden
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    footer.setAttribute("aria-hidden", "true");
  }
  
  export function closeModal(modalName) {
    // Get the modal element
    const modal = document.getElementById(modalName);
    // Get the header, main and footer elements
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    // Close the modal
    modal.close();
    modal.style.display = "none";
    // Set the aria-hidden attribute of the modal to true to indicate that it is hidden
    modal.setAttribute("aria-hidden", "true");
    // Set the aria-hidden attribute of the header, main and footer elements to false to indicate that they are visible
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    footer.setAttribute("aria-hidden", "false");
  }