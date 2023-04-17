
export function photographerFactory (data) {
  // Destructuring the data object to extract its properties
  const { name, id, city, country, tagline, price, portrait } = data

  // Creating the path for the portrait image
  const picture = `assets/photographers/${portrait}`

  // Defining a function that will return a DOM element for the photographer card
  function getPhotographerCardDOM () {
    // Create an article element to contain the photographer card
    const article = document.createElement('article')
    article.className += 'photographer-card'

    // Create a link element pointing to the photographer portfolio
    const photographerCardLink = document.createElement('a')
    photographerCardLink.className += 'photographer-card-link'
    photographerCardLink.setAttribute('href', `photographer.html?id=${id}`)
    photographerCardLink.setAttribute(
      'aria-label',
      `Lien vers le portfolio de ${name}`
    )

    // Create an image element for the photographer portrait
    const photographerImg = document.createElement('img')
    photographerImg.className += 'photographer-img'
    photographerImg.setAttribute('src', picture)
    photographerImg.setAttribute('alt', `Photo de ${name}`)
    photographerImg.setAttribute('aria-label', `Photo de ${name}`)

    // Create a heading element for the photographer name
    const photographerName = document.createElement('h2')
    photographerName.className += 'photographer-name'
    photographerName.textContent = name

    // Create a paragraph element for the location
    const photographerLocation = document.createElement('p')
    photographerLocation.className += 'photographer-location'
    photographerLocation.textContent = `${city}, ${country}`

    // Create a paragraph element for the tagline
    const photographerTagline = document.createElement('p')
    photographerTagline.className += 'photographer-tagline'
    photographerTagline.textContent = tagline

    // Create a paragraph element for the rate
    const photographerRate = document.createElement('p')
    photographerRate.className += 'photographer-rate'
    photographerRate.textContent = `${price} € / jour`

    // Append the image and heading to the link element
    photographerCardLink.appendChild(photographerImg)
    photographerCardLink.appendChild(photographerName)

    // Append the link, location, tagline, and rate to the article element
    article.appendChild(photographerCardLink)
    article.appendChild(photographerLocation)
    article.appendChild(photographerTagline)
    article.appendChild(photographerRate)

    // Return the article element
    return article
  }

  // Returning an object with the name and picture properties and the getPhotographerCardDOM function
  return { name, picture, getPhotographerCardDOM }
}
