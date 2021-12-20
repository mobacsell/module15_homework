'use strict';

const   btn = document.querySelector('.btn'),
        result = document.querySelector('.result'),
        resultTimeZone = document.querySelector('.result__time-zone'),
        resultDateTime = document.querySelector('.result__date-time');

let latitude,
    longitude;

btn.addEventListener('click', () => {
    sendGeolocationToAPI();
});


function sendGeolocationToAPI() {
//Функция определяет геолокацию пользователя и отпарвляет API-запрос к TimeZone
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
        showMessageError('Ошибка при получении гео-данных.');
    } 
}

function geoSuccess(position) {
//CF - успешное получение гео-данных
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
        .then(result => {
            return result.text();
        }).then(result => {
            showMessageSuccess(JSON.parse(result));
        }).catch(() => {
            showMessageError('Ошибка при отправке API-запроса.');
        });
}

function geoError() {
//CF - неудачное получение гео-данных  
    showMessageError('Ошибка при получении гео-данных.');
}

function showMessageSuccess(res) {
//Функция отображает данные при успешном выполнении API-запроса
    result.innerHTML = `
        <p class="result__time-zone"><span class="bold">Временная зона пользователя:</span> ${res.timezone}</p>
        <p class="result__date-time"><span class="bold">Текущие дата/время:</span> ${res.date_time_txt}</p>
        `;     
}

function showMessageError(message) {
//Функция отображает ошибку при неудачном получении гео-данных/API-запроса к TimeZone    
    result.innerHTML = `
        <p class="result__time-zone"><span class="bold">Временная зона пользователя:</span> <span class="red">${message}</span></p>
        <p class="result__date-time"><span class="bold">Текущие дата/время:</span> <span class="red">${message}</span></p>
        `;
}
