const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
let students = [];
app.post("/students", (req, res) => {
  const { id, student, department, college } = req.body;
  if (!id || !student || !department || !college) {
    return res.status(400).json({
      error: "All fields are required (id, student, department, college)",
    });
  }
  const exists = students.find((s) => s.id === id);
  if (exists) {
    return res.status(409).json({ error: "Student ID already exists" });
  }

  const newStudent = { id, student, department, college };
  students.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    data: newStudent,
  });
});
app.get("/students", (req, res) => {
  res.json(students);
});
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);

  res.json({
    message: "Student deleted successfully",
    data: deletedStudent[0],
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});