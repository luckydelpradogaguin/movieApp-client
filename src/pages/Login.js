import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useNavigate } from "react-router-dom";
import AppNavBar from "../components/AppNavBar";

// Initialize Notyf
const notyf = new Notyf();

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://movieapp-api-lms1.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        notyf.success(data.message || "Login successful!");

        // Save token
        localStorage.setItem("token", data.token);

        // Check if the credentials match the admin account
        if (
          formData.email === "admin@mail.com" &&
          formData.password === "admin123"
        ) {
          localStorage.setItem("role", "admin");
          navigate("/adminDashboard");
        } else {
          localStorage.setItem("role", "user");
          navigate("/userDashboard");
        }
      } else {
        const errorData = await response.json();
        notyf.error(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      notyf.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <AppNavBar />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
        <p className="mt-3">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </Container>
    </>
  );
};

export default Login;
