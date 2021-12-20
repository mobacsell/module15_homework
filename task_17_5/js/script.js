'use strict';

const   inputText = document.querySelector('.form__text'),
        btnSend = document.querySelector('.form__button-send--disabled'),
        btnGeo = document.querySelector('.form__button-geo--disabled'),
        result = document.querySelector('.result');

let webSocket,
    latitude,
    longitude;

openConnection();
getData();

btnSend.addEventListener('click', (event) => {
    event.preventDefault();
    checkValue(inputText.value);
});

btnGeo.addEventListener('click', sendGeoData);

function openConnection() {
//Функция открывает WebSocket-соединение
    btnSend.disabled = true;
    btnGeo.disabled = true;
    webSocket = new WebSocket('wss://ws.ifelse.io');

    webSocket.addEventListener('open', () => {
        btnSend.disabled = false;
        btnGeo.disabled = false;
        btnSend.classList.toggle('form__button-send');
        btnSend.classList.toggle('form__button-send--disabled');
        btnGeo.classList.toggle('form__button-geo');
        btnGeo.classList.toggle('form__button-geo--disabled');
        //Как только соединение будет установлено, кнопки отпарвки сообщения и геоданных станет активной
    });

    webSocket.addEventListener('error', (event) => {
        showErrorMessage('Ошибка при соединении. Попробуйте позже.');
    });
}

function sendData() {
//Функция реализует функционал отправки сообщений серверу и отображения сообщения в чате
    showSentMessage(inputText.value);  
    webSocket.send(inputText.value);
    inputText.value = '';
    inputText.focus();        
}

function checkValue(value) {
//Функция проверяет, введен ли текст в текстовом поле. Если да, то сообщение отпаравляется на сервер. В противном случае функция завершает работу.
    if(!value) {
        return false;
    } else {
        sendData();
    }
}

function getData() {
//Функция реализует функционал получения сообщений с сервера через WebSocket-соединение    
    webSocket.addEventListener('message', (event) => {
        if(event.data !== '[object Object]') {
            showAnswear(event.data);
        } 
    });       
}

function showErrorMessage(message) {
//Функция отображает сообщение-ошибку  
    const   resultError = document.createElement('div');

    resultError.classList.add('result__error');  
    resultError.innerHTML = message;
    result.insertAdjacentElement('beforeend', resultError);
    inputText.focus();
}

function showSentMessage(message) {
//Функция отображает отправленное сообщение
    const   resultMessage = document.createElement('div');
    
    resultMessage.classList.add('result__message', 'message');  
    resultMessage.innerHTML = message;
    result.insertAdjacentElement('beforeend', resultMessage);
    inputText.focus();
    result.scrollTop = result.scrollHeight - (result.offsetHeight - result.clientHeight * 2);
}

function showAnswear(message) {
//Функция отображает ответ сервера
    const   resultAnswear = document.createElement('div');

    resultAnswear.classList.add('result__answear');  
    resultAnswear.innerHTML = message;
    result.insertAdjacentElement('beforeend', resultAnswear);
    result.scrollTop = result.scrollHeight - (result.offsetHeight - result.clientHeight * 2);
}


function sendGeoData(e) {
//Функция реализует функционал получения геоданных и отправки их на сервер
    e.preventDefault();
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
        showErrorMessage('Геолокация недоступна в этом браузере');
        btnGeo.removeEventListener('click', sendGeoData);
    }
}

function geoSuccess(position) {
//CF - успешное получение геоданных   
    latitude = position.coords.latitude;  
    longitude = position.coords.longitude;  
    showSentMessage(`<a target="_blank" class="message__link" href="https://www.openstreetmap.org/#map=15/${latitude}/${longitude}">Гео-локация</a>`);
    webSocket.send({"latitude": latitude, "longitude": longitude});
}
    
function geoError() {
//CF - ошибка в получениии геоданных 
    showErrorMessage('Не удалось получить координаты.');
}
    

