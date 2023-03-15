let express = require(`express`);
let app = express();

app.use(express.static(`public`));

app.use(express.urlencoded({ extended: true }));

const hbs = require("hbs");
app.set("views", "views");
app.set("view engine", "hbs");

app.listen(3000, function () {
    console.log(`Сервер запущен`);
});

let database = [
    {
        title: `Вена`,
        description: `Cтолица и крупнейший город Австрии, расположенный в северо-восточной части страны. Это мегаполис с неповторимым шармом, энергией и атмосферой, исторический центр которого включён в список объектов Всемирного наследия ЮНЕСКО`,
        img0: `вена0`,
        img1: `вена1`,
        img2: `вена2`,
        price: 22937,
        number: 0,
        mark: ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png", "assets/half-star.png"]
    },
    {
        title: `Хорватия`,
        description: `Отказать этой европейской стране в поэтике невозможно – она удивительно живописна и разнообразна: море, горы, леса - и все это сохранено в первозданном состоянии. Экологическое состояние хорватской природы - одно из лучших в мире`,
        img0: `хорватия0`,
        img1: `хорватия1`,
        img2: `хорватия2`,
        price: 29092,
        number: 1,
        mark: ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png"]
    },
    {
        title: `Норвегия`,
        description: `Норвегия привлекательна природными достопримечательностями: горами, озерами, снежными долинами и, конечно же, фьордами. Ежегодно страну посещают более двух миллионов туристов`,
        img0: `норвегия0`,
        img1: `норвегия1`,
        img2: `норвегия2`,
        price: 26925,
        number: 2,
        mark: ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png", "assets/empty-star.png"]
    },
    {
        title: `Франция`,
        description: `Франция — это сладкий виноград, скользкие устрицы, сыр с плесенью и тягучий кальвадос. Холодные склоны Альп, пустыня в Пиле, гусиные фермы и кинофестивали — все это, разные лица одной страны`,
        img0: `франция0`,
        img1: `франция1`,
        img2: `франция2`,
        price: 94286,
        number: 3,
        mark: ["assets/star.png", "assets/star.png", "assets/star.png", "assets/star.png", "assets/empty-star.png"]
    }
];
let usersDarabase = [];
let user = {};
let basket = [];

app.get(`/`, function (req, res) {
    res.render(`index`);
});

app.post(`/signUp`, function (req, res) {
    basket = [];
    user.username = req.body.username;
    user.email = req.body.email;
    user.pswd = req.body.pswd;
    user.welcomeMessage = true;
    res.redirect(`/main`);
});

app.get(`/main`, function (req, res) {
    let tag = req.query.tag;
    let allTickets = true;
    let popularTickets = false;
    let info = database;
    if (tag == "popular") {
        allTickets = false;
        popularTickets = true;
        info = [];
        database.forEach((item) => {
            info.unshift(item);
        });
    }
    res.render(`main`, {
        user: user,
        basket: basket,
        info: info,
        allTickets: allTickets,
        popularTickets: popularTickets
    });
});

app.get(`/profile`, function (req, res) {
    res.render(`profile`, {
        info: database,
        user: user
    });
});

app.get(`/basket`, function (req, res) {
    let noneBuys = true;
    if (basket.length) noneBuys = false;
    res.render(`basket`, {
        info: database,
        user: user,
        basket: basket,
        noneBuys: noneBuys
    });
});

app.get(`/article`, function (req, res) {
    let id = req.query.id;
    let inBasket = false;
    basket.forEach((item) => {
        if (item.title.includes(database[id].title)) {
            inBasket = true;
        }
    });
    res.render(`article`, {
        info: database[id],
        id: id,
        user: user,
        basket: basket,
        inBasket: inBasket
    });
});

app.get(`/newBuy`, function (req, res) {
    let id = req.query.id;
    let condition = true;
    basket.forEach((item) => {
        if (item.title.includes(database[id].title)) {
            condition = false;
        }
    });
    if (condition) {
        basket.push(database[id]);
    }
    res.redirect(`/article?id=${id}`);
});

app.get(`/about-us`, function (req, res) {
    res.render(`about-us`, {
        basket: basket
    });
});

app.get(`/deleteWelcome`, function (req, res) {
    user.welcomeMessage = false;
    res.redirect(`/main`);
});

app.get(`/deleteTicket`, function (req, res) {
    basket.splice(req.query.id, 1);
    res.redirect(`/basket`);
});

/* Привет завтрашний я. Я на сегодня закончил работу и иду отдыхать. Завтра ты должен будешь реализовать заказ в корзине. Я нашёл отличную форму на кодпен, чтобы тебе не пришлось пыжиться над версткой. Удачи! */
