import { useState } from "react";
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate('/');
    }
  }

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <Container className='d-flex align-items-center justify-content-center min-vh-100'>
      <Form onSubmit={handleSubmit} className='p-5 rounded'>
        <h1 className='text-center mb-4'>Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' value={credentials.email} onChange={handleChange} style={{width:'40em'}} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' value={credentials.password} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className='w-100 mt-4'>
          Submit
        </Button>

        <div className='text-center mt-3'>
          <Link to='/createuser' className='text-decoration-none'>
            <small>New User? Create Account</small>
          </Link>
        </div>
      </Form>
    </Container>
  );
}