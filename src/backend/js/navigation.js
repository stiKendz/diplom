let toSingInButton = document.querySelector('.to-sing-in-page');
let toSingUnButton = document.querySelector('.to-sing-up-page');
let toUserCarsPage = document.querySelector('.to-user-cars-page');
let mainPageButton = document.querySelector('.main-page-buttton');


toSingInButton.addEventListener('click', () => {
    window.location.href = '../frontend/sing-in.html';
});

toSingUnButton.addEventListener('click', () => {
    window.location.href = '../frontend/sing-up.html';
});

toUserCarsPage.addEventListener('click', () => {
    window.location.href = '../frontend/user-cars.html';
});

mainPageButton.addEventListener('click', () => {
    window.location.href = '../frontend/inde.html';
});