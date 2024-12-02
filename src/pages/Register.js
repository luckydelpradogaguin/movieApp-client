import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AppNavBar from "../components/AppNavBar";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useNavigate } from "react-router-dom";

// Initialize Notyf
const notyf = new Notyf();

const RegistrationPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Moved inside the component

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://movieapp-api-lms1.onrender.com/users/register",
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
        notyf.success(data.message || "Registration successful!");
        setFormData({ email: "", password: "" }); // Reset form
        navigate("/login"); // Navigate to the login page
      } else {
        const errorData = await response.json();
        notyf.error(
          errorData.message || "Registration failed. Please try again."
        );
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
            <h2 className="text-center mb-4">Register</h2>
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
                Register
              </Button>
            </Form>
          </Col>
        </Row>
        <p className="mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Container>
    </>
  );
};

export default RegistrationPage;
