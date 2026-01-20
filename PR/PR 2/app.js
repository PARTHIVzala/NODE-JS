const express = require("express");

const PORT = 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static("public"));


let allUsers = [
    {
        id: 101,
        name: "Shreyas Iyer",
        email: "sarpanch@gmail.com",
        password: "S@1133",
        phone: 78451488108,
        address: "Chembur",
    },
    {
        id: 102,
        name: "Joe Root",
        email: "R@gmail.com",
        password: "R@1133",
        phone: 78451588858,
        address: "Dore",
    },
    {
        id: 103,
        name: "Jason Roy",
        email: "Samurai@gmail.com",
        password: "J@1133",
        phone: 78410588858,
        address: "Durban",
    },
    {
        id: 104,
        name: "David Malan",
        email: "WayBoss@gmail.com",
        password: "D@1133",
        phone: 78410588858,
        address: "Roehampton",
    }
];

let id = 103;

app.get("/", (req, res) => {
    return res.render('table', {
        name: " PARTHIV ",
        allUsers
    });
});

app.get("/addUserPage", (req, res) => {
    return res.render('form');
});

app.post("/addUser", (req, res) => {
    const user = req.body;

    user.id = id;
    id++;

    allUsers.push(user)

    return res.redirect('/');
});

app.get("/editPage", (req, res) => {
    console.log(req.query);

    const user = allUsers.find((user) => user.id == req.query.userId);

    if (!user) {
        return res.redirect('/not-found');
    }

    return res.render('edit', {
        user
    });
});

app.post("/updateUser", (req, res) => {
    console.log(req.body);

    allUsers = allUsers.map((user) => {
        if (user.id == req.body.id) {
            return req.body;
        } else {
            return user;
        }
    })

    return res.redirect('/');
});

app.get("/deleteUser", (req, res) => {
    console.log(req.query); 
    const userId = req.query.userId;

    allUsers = allUsers.filter((user) => user.id != userId);

    console.log(allUsers);

    return res.redirect('/')
});

app.get('/not-found', (req, res) => {
    return res.render('not_found');
})

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not started...", err);
        return false;
    }
    console.log("Server is started...");
});
