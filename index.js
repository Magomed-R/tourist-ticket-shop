let express = require(`express`);
let app = express();

app.use(express.static(`public`));

const hbs = require("hbs");
app.set("views", "views");
app.set("view engine", "hbs");

let database = [
    {
        title: `Вена`,
        description: `Cтолица и крупнейший город Австрии, расположенный в северо-восточной части страны. Это мегаполис с неповторимым шармом, энергией и атмосферой, исторический центр которого включён в список объектов Всемирного наследия ЮНЕСКО`,
        img0: `вена0`,
        img1: `вена1`,
        img2: `вена2`,
        price: 22937
    },
    {
        title: `Хорватия`,
        description: `Отказать этой европейской стране в поэтике невозможно – она удивительно живописна и разнообразна: море, горы, леса - и все это сохранено в первозданном состоянии. Экологическое состояние хорватской природы - одно из лучших в мире`,
        img0: `хорватия0`,
        img1: `хорватия1`,
        img2: `хорватия2`,
        price: 29092
    },
    {
        title: `Норвегия`,
        description: `Норвегия привлекательна природными достопримечательностями: горами, озерами, снежными долинами и, конечно же, фьордами. Ежегодно страну посещают более двух миллионов туристов`,
        img0: `норвегия0`,
        img1: `норвегия1`,
        img2: `норвегия2`,
        price: 26925
    },
    {
        title: `Франция`,
        description: `Франция — это сладкий виноград, скользкие устрицы, сыр с плесенью и тягучий кальвадос. Холодные склоны Альп, пустыня в Пиле, гусиные фермы и кинофестивали — все это, разные лица одной страны`,
        img0: `франция0`,
        img1: `франция1`,
        img2: `франция2`,
        price: 94286
    }
];

app.get(`/`, function (req, res) {
    let name = req.query.txt;
    let email = req.query.email;
    let buys = req.query.buys;
    console.log(req.query);
    if (!buys) {
        buys = 0;
    }
    if (!name) {
        res.render(`index`);
    } else {
        res.render(`main`, {
            name: name,
            email: email,
            buys: buys,
            info: database
        });
    }
});

app.get(`/profile`, function (req, res) {
    let name = req.query.txt;
    let email = req.query.email;
    let buys = req.query.buys;
    res.render(`profile`, {
        name: name,
        email: email,
        buys: buys
    });
});

app.get(`/article`, function (req, res) {
    let name = req.query.txt;
    let email = req.query.email;
    let buys = req.query.buys;
    let id = req.query.id;
    if (!id || id < 0 || id > database.length) {
        res.render(`404`);
    }
    res.render(`article`, {
        name: name,
        email: email,
        buys: buys,
        info: database[id]
    });
});

app.get(`/about-us`, function (req, res) {
    let name = req.query.txt;
    let email = req.query.email;
    let buys = req.query.buys;
    if (!buys) {
        buys = 0
    }
    res.render(`about-us`, {
        name: name,
        email: email,
        buys: buys
    });
});

app.get(`/basket`, function (req, res) {
    let name = req.query.txt;
    let email = req.query.email;
    let buys = req.query.buys;
    if (!buys) {
        buys = 0
    }
    res.render(`basket`, {
        name: name,
        email: email,
        buys: buys
    });
});

app.listen(3000, function () {
    console.log(`Сервер запущен`);
});
