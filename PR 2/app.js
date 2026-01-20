const express = require("express");
const app = express();
app.use(express.static("public"));

const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // ✅ CSS enable

let allUsers = [
  {
    id: 101,
    name: "Shreyas Iyer",
    email: "Shreyas@gmail.com",
    password: "Sarpanch",
    phone: 7845148885,
    address: "Chempur",
  },
  {
    id: 102,
    name: "Nisu",
    email: "nisu@gmail.com",
    password: "myboss",
    phone: 8140190388,
    address: "Shrusti",
  },
  {
    id: 103,
    name: "Hemu",
    email: "hemu@gmail.com",
    password: "hemupatel",
    phone:  8347378835,
    address: "Mota Varachha",
  },
  {
    id: 104,
    name: "Joe Root",
    email: "Atoot@gmail.com",
    password: "AtootRoot",
    phone: 7845104885,
    address: "Dore",
  },
];

let id = 103;

/* READ */
app.get("/", (req, res) => {
  res.render("table", { name: "Jaynesh", allUsers });
});

/* CREATE – form page */
app.get("/addUserPage", (req, res) => {
  res.render("form");
});

/* CREATE – add user */
app.post("/addUser", (req, res) => {
  const user = req.body;
  user.id = id++;
  allUsers.push(user);
  res.redirect("/");
});

/* UPDATE – edit page */
app.get("/editPage", (req, res) => {
  const user = allUsers.find(u => u.id == req.query.userId);
  if (!user) return res.redirect("/not-found");
  res.render("edit", { user });
});

/* UPDATE – save */
app.post("/updateUser", (req, res) => {
  allUsers = allUsers.map(u =>
    u.id == req.body.id ? req.body : u
  );
  res.redirect("/");
});

/* DELETE */
app.get("/deleteUser", (req, res) => {
  allUsers = allUsers.filter(u => u.id != req.query.userId);
  res.redirect("/");
});

/* NOT FOUND */
app.get("/not-found", (req, res) => {
  res.render("not_found");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
