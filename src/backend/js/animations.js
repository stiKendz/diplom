const focusedDivFilter = document.querySelectorAll('.filter-item');

if (focusedDivFilter.length > 0) {
    for (let i = 0; i < focusedDivFilter.length; i++) {
        focusedDivFilter[i].addEventListener('click', () => {
            focusedDivFilter[i].classList.toggle('select');
        });
    };
};
