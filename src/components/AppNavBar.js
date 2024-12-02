import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function AppNavBar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movie App
        </Navbar.Brand>
        <Nav className="ms-auto">
          {isLoggedIn ? (
            <>
              {role === "admin" && (
                <Nav.Link as={Link} to="/adminDashboard">
                  Admin Dashboard
                </Nav.Link>
              )}
              {role === "user" && (
                <Nav.Link as={Link} to="/userDashboard">
                  User Dashboard
                </Nav.Link>
              )}
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
