import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    number: "",
  });
  const [users, setUsers] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData
      );
      alert(response.data.message);
      setformData({
        name: "",
        email: "",
        number: "",
      });
    } catch (err) {
      console.log("Error submitting form:", err);
      alert("Failed to submit the form");
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [users]);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="App">
        <h1>User Form </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "25px" }}>
            <label> Name:</label>
            &nbsp;
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter name"
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: "25px" }}>
            <label> Email:</label>
            &nbsp;
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: "25px" }}>
            <label> Number:</label>
            &nbsp;
            <input
              type="number"
              name="number"
              placeholder="Enter number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <h2>Saved Users</h2>
        <div className="user-list">
          {users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user._id}>
                  <strong>{user.name}</strong>
                  <br /> {user.email} - {user.number}
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
