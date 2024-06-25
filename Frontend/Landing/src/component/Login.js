import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

function Login() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/profile');
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h2 className="mb-4">Login to Your Account</h2>
          <Button color="primary" onClick={handleLogin}>
            Sign in with Google
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;