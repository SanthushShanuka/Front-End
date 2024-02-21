import { Button, Form } from "react-bootstrap";
import "../styles/Loginpage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const welcomeMessage = () => {
    Swal.fire(`Hi ${credentials.username}! Welcome Back`);
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/auth/login", credentials);
      localStorage.setItem("token", response.data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
      welcomeMessage();
      navigate("/place/order");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="loginpage">
      <Form onSubmit={handleUserLogin}>
        <div className="shop-name">
          <p>Food Mart</p>
        </div>
        <div className="logo">
          <i className="bi bi-cup-hot-fill"></i>
        </div>
        <div className="welcome-back-txt">
          <p>WELCOME BACK 👋🏻</p>
        </div>
        <div className="title">
          <p>Continue to your Account.</p>
        </div>
        <div className="input-fields">
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Enter username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter username" 
              name="username"
              onChange={handleChange}
              value={credentials.username}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              name="password"
              onChange={handleChange}
              value={credentials.password}
            />
          </Form.Group>
        </div>
        <Button type="submit">Continue</Button>
        <div className="register-link-and-text">
          <div className="text"><p>Are you a Newbie?</p></div>
          <div className="register-link">
            <Link to="/create/account">GET STARTED - IT'S FREE</Link>
          </div>
        </div>
        {/* Consider removing style-group divs if they're not being used for specific styling */}
      </Form>
    </div>
  );
};

export default LoginPage;
