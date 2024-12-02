import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import AppNavBar from "../components/AppNavBar";

const UserDashboard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://movieapp-api-lms1.onrender.com/movies/getMovies"
        );
        const data = await response.json();

        if (data.movies && Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          console.error("Invalid movies data format:", data);
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <AppNavBar />
      <Container className="mt-5">
        <h2 className="mb-4">Movies List</h2>
        <Row>
          {movies.map((movie, index) => (
            <Col md={4} key={movie._id || index} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {movie.director} ({movie.year})
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Genre:</strong> {movie.genre}
                  </Card.Text>
                  <Card.Text>
                    <strong>Description:</strong> {movie.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Comments:</strong>
                    {Array.isArray(movie.comments) &&
                    movie.comments.length > 0 ? (
                      <ul>
                        {movie.comments.map((comment, idx) => (
                          <li key={comment._id || idx}>
                            {comment.comment} (by User {comment.userId})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No comments available</span>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default UserDashboard;
