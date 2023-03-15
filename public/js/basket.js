let titles = document.querySelectorAll(`.card-title`);

renderResultPrice();

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

let cards = document.querySelectorAll(`.card`);

cards.forEach((card) => {
    const firstPrice = Number(card.querySelector(`.ticket-price`).innerHTML);
    let price = card.querySelector(`.ticket-price`);
    function renderPrice() {
        price.innerHTML = firstPrice * input.value;
        renderResultPrice();
    }
    let input = card.querySelector(`input`);
    input.addEventListener(`input`, function () {
        renderPrice();
        if (input.value.length > 2) {
            input.value = input.value.slice(0, input.value.length - 1);
        } else if (input.value < 0) {
            input.value = 0;
        }
    });
    card.querySelector(`.minus`).addEventListener(`click`, function () {
        if (Number(input.value)) {
            input.value -= 1;
        }
        renderPrice();
    });
    card.querySelector(`.plus`).addEventListener(`click`, function () {
        input.value = Number(input.value) + 1;
        renderPrice();
    });
});

function renderResultPrice() {
    let ticketPrices = document.querySelectorAll(`.ticket-price`);
    let summ = 0;
    ticketPrices.forEach((item) => {
        summ += Number(item.innerHTML);
    });
    document.querySelector(`.result-price`).innerHTML = summ;
}
