document.querySelector(`#login`).addEventListener(`click`, function () {
    document.querySelector(`.c-red`).classList.remove(`d-none`);
    if (document.querySelector(`.login__email`).value.length > 0 && document.querySelector(`.login__pswd`).value.length > 0) {
        document.querySelector(`.c-red`).innerHTML = `Данного email-а нет в базе`;
    } else {
        document.querySelector(`.c-red`).innerHTML = `Не все поля заполнены верно`;
    }
});
