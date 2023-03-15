let titles = document.querySelectorAll(`.card-title`);

document.querySelector(`input`).addEventListener(`input`, function () {
    let value = document.querySelector(`input`).value.toLowerCase();
    let condition = true;
    titles.forEach((title) => {
        if (title.innerHTML.toLowerCase().includes(value)) {
            title.closest(`.card`).classList.remove(`d-none`);
        } else {
            title.closest(`.card`).classList.add(`d-none`);
        }
    });
    titles.forEach((title) => {
        if (title.closest(`.card`).classList.contains(`d-none`)) {
            document.querySelector(`.not-found`).classList.remove(`d-none`);
        } else {
            document.querySelector(`.not-found`).classList.add(`d-none`);
        }
    });
});
