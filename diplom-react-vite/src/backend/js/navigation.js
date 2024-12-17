const toSingInButton = document.querySelector('.to-sing-in-page');
const toSingUnButton = document.querySelector('.to-sing-up-page');
const toUserCarsPage = document.querySelector('.to-user-cars-page');
const mainPageButton = document.querySelector('.main-page-button');
const adminPageButton = document.querySelector('.admin-page-button');
const previousPageButton = document.querySelector('.previous-page-button');


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

if (adminPageButton) {
    adminPageButton.addEventListener('click', () => {
        window.location.href = '../frontend/admin-page.html';
    });
};

if (previousPageButton) {
    previousPageButton.addEventListener('click', () => {
        window.history.go(-1);
    });
};


