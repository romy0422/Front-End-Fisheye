

async function getPhotographers() {
 

    let photographersJson = await fetch("./data/photographers.json"); //lecture du lien json
    let photographers = await photographersJson.json(); //promet un objet json

    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer-section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();