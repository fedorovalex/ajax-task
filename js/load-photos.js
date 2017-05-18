const ROOT = 'http://jsonplaceholder.typicode.com';
var numAlbum = 1;

function getPromiseAjaxGET(url1) {
    return fetch(url1, {method: 'GET'}).then(response => {return response.status == 200 ? response.json() : Promise.reject(response)});
}

function getAlbum(num) {
    num = (num === undefined) ? "" : "/" + num;
    return getPromiseAjaxGET(`${ROOT}/albums${num}`);
}

function getPhoto(idAlbum, numPhoto) {
    numPhoto = (numPhoto === undefined) ? "" : "/" + numPhoto;
    idAlbum = (idAlbum === undefined) ? "" : "?albumId=" + idAlbum;
    return getPromiseAjaxGET(`${ROOT}/photos${numPhoto}${idAlbum}`);
}

function changeTitle(title) {
    $('.title-photos').empty().append(title);
}

function addPhoto(photo) {
    $('.photos').append(`<a href="${photo.url}" target="_blank"><img src="${photo.thumbnailUrl}"></a>`);
}

function cleaningPhotos() {
    $('.photos').empty();
}

function loadAlbum(num) {
    return getAlbum(num).then(album => {
        changeTitle(album.title);
        cleaningPhotos();
        return getPhoto(album.id);
    }).then(photos => photos.forEach(addPhoto));
}

$('.button:last-child>button').click(function () {
    loadAlbum(++numAlbum).catch(error => {alert("Это был последний альбом!"); numAlbum--});
});

$('.button:first-child>button').click(function () {
    loadAlbum(--numAlbum).catch(error => {alert("Это первый альбом!"); numAlbum++});
});

loadAlbum(numAlbum);