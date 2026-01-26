const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let students = [
    { id: 1, name: "Nisu", age: 26, course: "Full Stack Development", marks: 85 },
    { id: 2, name: "Hemu", age: 21, course: "Computer Science", marks: 78 },
    { id: 3, name: "Ridhdhi", age: 23, course: "Mechanical Engineering", marks: 69 },
    { id: 4, name: "Ayaan", age: 22, course: "Import Export Management", marks: 92 }
];

app.get("/", (req, res) => {
    res.render("index", { students });
});


app.post("/add-student", (req, res) => {
    const { name, age, course, marks } = req.body;

    const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name,
        age: Number(age),
        course,
        marks: Number(marks)
    };

    students.push(newStudent);
    res.redirect("/");
});
app.get("/edit-student/:id", (req, res) => {
  const id = req.params.id;

  const student = students.find(s => s.id == id);

  res.render("edit-student", { student });
});

app.post("/update-student/:id", (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  students = students.map(s =>
    s.id == id ? { ...s, name, email } : s
  );

  res.redirect("/");
});

app.use(express.urlencoded({ extended: true }));


app.get("/delete-student/:id", (req, res) => {
    let id = req.params.id;
    const student = students.find(student => student.id == id);
    if (!student) return res.redirect("/");
    res.render("delete-student", { student });
});
app.post("/delete-student/:id", (req, res) => {
    let id = req.params.id;
    students = students.filter(student => student.id != id);
    res.redirect("/");
});

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});