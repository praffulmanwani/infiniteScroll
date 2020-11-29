const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const count = 30;
const apiKey = "QMXE3n6xn8Fab83g7bk22G41MXhP-I2x1Be0RWHp3wU";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//display photo
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages ){
        ready = true;
        loader.hidden = true;
        
    }
}
function displayPhotos(){
    imagesLoaded = 0; 
    totalImages = photosArray.length;
    photosArray.forEach((photo) =>{
        const item = document.createElement("a");
        item.setAttribute("href",photo.links.html);
        item.setAttribute("target","_blank");
        // image attribute
        const img = document.createElement("img");
        img.setAttribute("src",photo.urls.regular);
        img.setAttribute("alt",photo.alt_description);
        img.setAttribute("title",photo.alt_description);
        img.addEventListener("load",imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(img);


    })
}
// get photos
async function getPhotos(){
    try{
        const responce = await fetch(apiUrl);
        photosArray = await responce.json();
        displayPhotos();
    }catch(error){

    }
}
window.addEventListener("scroll",() =>{
    if(window.innerHeight + window.scrollY >=  document.body.offsetHeight - 1000 && ready){
        getPhotos();

    }
});
getPhotos();

