'use strict';

const   btn = document.querySelector('.btn'),
        divIconLight = document.querySelector('.btn-icon--light'),
        divIconDark = document.querySelector('.btn-icon--dark');


btn.addEventListener('click', (event) => {
    divIconDark.classList.toggle('btn-icon--none');
    divIconLight.classList.toggle('btn-icon--none');
});

