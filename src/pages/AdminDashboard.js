import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import AppNavBar from "../components/AppNavBar";

// Initialize Notyf
const notyf = new Notyf();

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    year: "",
    description: "",
    genre: "",
    comments: "",
  });

  // Fetch movies on component load
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://movieapp-api-lms1.onrender.com/movies/getMovies"
      );
      const data = await response.json();

      if (data.movies && Array.isArray(data.movies)) {
        setMovies(data.movies); // Update the movies state
      } else {
        console.error("Invalid movies data format:", data);
        setMovies([]); // Handle invalid data format
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://movieapp-api-lms1.onrender.com/movies/addMovie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMovie),
        }
      );

      if (response.ok) {
        notyf.success("Movie added successfully!");
        fetchMovies(); // Refresh the movies list

        // Reset form and close modal
        setShowModal(false);
        setNewMovie({
          title: "",
          director: "",
          year: "",
          description: "",
          genre: "",
          comments: "",
        });
      } else {
        const errorData = await response.json();
        notyf.error(errorData.message || "Failed to add movie.");
      }
    } catch (error) {
      notyf.error("An error occurred while adding the movie.");
    }
  };

  return (
    <>
      <AppNavBar />
      <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <h2>Admin Dashboard</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Add New Movie
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Director</th>
              <th>Year</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={movie._id || index}>
                <td>{index + 1}</td>
                <td>{movie.title}</td>
                <td>{movie.director}</td>
                <td>{movie.year}</td>
                <td>{movie.description}</td>
                <td>{movie.genre}</td>
                <td>
                  {Array.isArray(movie.comments) &&
                  movie.comments.length > 0 ? (
                    <ul>
                      {movie.comments.map((comment, idx) => (
                        <li key={comment._id || idx}>
                          {comment.comment} (User {comment.userId})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No comments available"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for Adding New Movie */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter movie title"
                  value={newMovie.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  name="director"
                  placeholder="Enter director"
                  value={newMovie.director}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  placeholder="Enter release year"
                  value={newMovie.year}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  placeholder="Enter description"
                  value={newMovie.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  placeholder="Enter genre"
                  value={newMovie.genre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  name="comments"
                  rows={2}
                  placeholder="Add comments"
                  value={newMovie.comments}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Add Movie
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default AdminDashboard;
