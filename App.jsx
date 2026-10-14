
import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Arun", department: "CSE", year: "3rd Year" },
    { id: 2, name: "Priya", department: "IT", year: "2nd Year" },
    { id: 3, name: "Kumar", department: "ECE", year: "3rd Year" }
  ]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("CSE");
  const [year, setYear] = useState("3rd Year");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  // Add or update student
  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Please enter a student name.");
      return;
    }

    if (editId !== null) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editId
            ? { ...student, name: name.trim(), department, year }
            : student
        )
      );
      setMessage("Student updated successfully!");
      setEditId(null);
    } else {
      setStudents((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: name.trim(),
          department,
          year
        }
      ]);
      setMessage("Student added successfully!");
    }

    setName("");
    setDepartment("CSE");
    setYear("3rd Year");
  }

  // Edit student
  function editStudent(student) {
    setName(student.name);
    setDepartment(student.department);
    setYear(student.year);
    setEditId(student.id);
    setMessage("");
  }

  // Delete student
  function deleteStudent(id) {
    setStudents((prev) =>
      prev.filter((student) => student.id !== id)
    );

    if (editId === id) {
      cancelEdit();
    }

    setMessage("Student deleted successfully!");
  }

  // Cancel editing
  function cancelEdit() {
    setName("");
    setDepartment("CSE");
    setYear("3rd Year");
    setEditId(null);
    setMessage("");
  }

  // Search students by name or department
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>

        <button type="submit">
          {editId !== null ? "Update Student" : "Add Student"}
        </button>

        {editId !== null && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      {message && <p className="message">{message}</p>}

      <input
        type="text"
        placeholder="Search by name or department"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Student List ({filteredStudents.length})</h2>

      {filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="student-list">
          {filteredStudents.map((student) => (
            <div className="student" key={student.id}>
              <h3>{student.name}</h3>
              <p>Department: {student.department}</p>
              <p>Year: {student.year}</p>

              <button
                type="button"
                onClick={() => editStudent(student)}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => deleteStudent(student.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
