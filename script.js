const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Chec if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(totalImages === totalImages) {
        ready = true;
        loader.hidden = true;
        // Se carga inicialmente una catidad pequena, para que la carga inicial no se muy lenta, y luego se cambia la cantidad deseada
        initialLoad = false;
        count = 4;
    }
}

// Helper function to set attributes on DOM elements\
function setAttributes(element, attributes) {
    for ( const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplah
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description)

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//Unsplash API
const count = 2;
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Get photos from Unsplah API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        
        getPhotos();
    }
})

// On Load
getPhotos();