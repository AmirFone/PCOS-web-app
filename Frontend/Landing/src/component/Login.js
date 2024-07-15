import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
    <div className="login-page py-5" style={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardBody className="p-5">
                  <div className="text-center mb-5">
                    <h2 className="text-dark">Welcome Back!</h2>
                    <p className="text-muted">Sign in to continue to your PCOS Health Journey</p>
                  </div>
                  <div className="d-grid gap-3">
                    <Button 
                      color="primary" 
                      size="lg" 
                      className="btn-icon" 
                      onClick={handleLogin}
                    >
                      <FaGoogle className="me-2" />
                      Sign in with Google
                    </Button>
                    {/* <p className="text-muted text-center mb-0">
                      Don't have an account? <a href="#" className="text-primary">Sign up</a>
                    </p> */}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;