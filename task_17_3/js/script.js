'use strict';

const   btn = document.querySelector('.btn'),
        resultScreen = document.querySelector('.result__screen'),
        resultGeo = document.querySelector('.result__geolocation');

btn.addEventListener('click', () => {
    resultScreen.innerHTML = `<span class="bold">Ширина экрана:</span> ${window.screen.width} пикселей.<br><span class="bold">Высота экрана:</span> ${window.screen.height} пикселей.`;
    getGeo();
});

function getGeo() {
//Функция определяет геолокацию пользователя
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
    } else {
        showGeoError();
    }
}

function successGeo(position) {
//CF - успешное получение координат    
    showGeoSuccess(position.coords);
}

function errorGeo() {
//CF - неудачное получение координат   
    showGeoError();
}

function showGeoSuccess(coords) {
//Функция отображает координаты на экране в случае их успешного получения 
    resultGeo.innerHTML = `<span class="bold">Широта:</span> ${coords.latitude}<br><span class="bold">Долгота:</span> ${coords.longitude}`;
}

function showGeoError() {
//Функция выводит на экран ошибку, в случае невозможности получить ккординаты пользователя.
    resultGeo.innerHTML = `<span class="bold">Широта:</span> <span class="red">информация о местоположении недоступна.</span><br><span class="bold">Долгота:</span> <span class="red">информация о местоположении недоступна.</span>`;
}