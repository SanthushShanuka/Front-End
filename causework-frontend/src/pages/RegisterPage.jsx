import { Button, Form } from 'react-bootstrap';
import '../styles/Registerpage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();

    // Basic validation
    const { name, email, username, password } = formData;
    if (!name || !email || !username || !password) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/auth/register', formData);
      console.log(response.data);
      Swal.fire('Good job!', 'Your Account Created Successfully.', 'success');
      navigate('/login/account');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to create account', 'error');
    }
  };

  return (
    <div className="registerpage">
      <Form onSubmit={handleUserRegistration}>
        <div className="shop-name">
          <p>Food Mart</p>
        </div>
        {/* Removed unnecessary divs for simplicity */}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Full name</Form.Label>
          <Form.Control type="text" placeholder="Full name" name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Enter username</Form.Label>
          <Form.Control type="text" placeholder="Create username" name="username" value={formData.username} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter password</Form.Label>
          <Form.Control type="password" placeholder="Create password" name="password" value={formData.password} onChange={handleChange} />
        </Form.Group>
        <Button type="submit">Create Account</Button>
        <div className="privacy-policy">
          <p>By Signing up to uBrand, you agree to our Privacy Policy and Terms of Service</p>
        </div>
        <div className="already-and-login-link">
          <p>Already a Member? <Link to="/login/account">LOGIN HERE</Link></p>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
