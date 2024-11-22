let toSingInButton = document.querySelector('.to-sing-in-page');
let toSingUnButton = document.querySelector('.to-sing-up-page');
let toUserCarsPage = document.querySelector('.to-user-cars-page');
let mainPageButton = document.querySelector('.main-page-button');


if (toSingInButton) {
    toSingInButton.addEventListener('click', () => {
        window.location.href = '../frontend/sing-in.html';
    });
};

if (toSingUnButton) {
    toSingUnButton.addEventListener('click', () => {
        window.location.href = '../frontend/sing-up.html';
    });
};

if (toUserCarsPage) {
    toUserCarsPage.addEventListener('click', () => {
        window.location.href = '../frontend/user-cars.html';
    });
};

if (mainPageButton) {
    mainPageButton.addEventListener('click', () => {
        window.location.href = '../frontend/index.html';
    });
};



