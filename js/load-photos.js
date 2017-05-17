const ROOT = 'http://jsonplaceholder.typicode.com';
var numAlbum;

function getAlbum(num) {
    
    num = (num === undefined) ? "" : "/" + num;
    
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `${ROOT}/albums${num}`,
            method: 'GET'
        }).then(album => {resolve(album)}, album => {reject(album)});
    })
}

function getPhoto(idAlbum, numPhoto) {
    
    numPhoto = (numPhoto === undefined) ? "" : "/" + numPhoto;
    idAlbum = (idAlbum === undefined) ? "" : "?albumId=" + idAlbum;
    
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `${ROOT}/photos${numPhoto}${idAlbum}`,
            method: 'GET'
        }).then(photo => {resolve(photo)}, album => {reject(photo)});
    })
}

function changeTitle(title) {
    $('.title-photos').empty().append(title);
}

function addPhoto(photo) {
    $('.photos').append(`<img src="${photo.thumbnailUrl}">`);
    
}

function cleaningPhotos() {
    $('.photos').empty();
}

function loadAlbum(num) {
    getAlbum(num).then(album => {
        changeTitle(album.title);
        cleaningPhotos();
        return getPhoto(album.id);
    }).then(photos => photos.forEach(addPhoto));
}

/*getAlbum(1).then(album => {
    changeTitle(album.title);
}, album => alert("Все плохо!"));*/

loadAlbum(1);

//alert("OK");