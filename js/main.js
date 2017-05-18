;(function () {
    const ROOT = 'http://jsonplaceholder.typicode.com';
    var numAlbum = 1;

    function makeGETRequest(url) {
        return fetch(url, {method: 'GET'}).then(response => {
            return response.status == 200 ? response.json() : Promise.reject(response)
        });
    }

    function getAlbum(id) {
        id = (id === undefined) ? "" : "/" + id;
        return makeGETRequest(`${ROOT}/albums${id}`);
    }

    function getPhotos(albumId) {
        albumId = (albumId === undefined) ? "" : "?albumId=" + albumId;
        return makeGETRequest(`${ROOT}/photos${albumId}`);
    }

    function changeTitle(text) {
        $('.title-photos').empty().append(text);
    }

    function addPhoto(photo) {
        $('.photos').append(`<a href="${photo.url}" target="_blank"><img src="${photo.thumbnailUrl}"></a>`);
    }

    function removePhotos() {
        $('.photos').empty();
    }

    function loadAlbum(id) {
        return getAlbum(id).then(album => {
            changeTitle(album.title);
            removePhotos();
            return getPhotos(album.id);
        }).then(photos => photos.forEach(addPhoto));
    }

    $('.button-next>button').click(function () {
        loadAlbum(++numAlbum).catch(error => {alert("Это был последний альбом!"); numAlbum--});
    });

    $('.button-previous>button').click(function () {
        loadAlbum(--numAlbum).catch(error => {alert("Это первый альбом!"); numAlbum++});
    });

    loadAlbum(numAlbum);
    
}());