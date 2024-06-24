import React from "react";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

// Import client images
import Img1 from "../assets/images/user/img-1.jpg";
import Img2 from "../assets/images/user/img-2.jpg";
import Img3 from "../assets/images/user/img-3.jpg";
import Img4 from "../assets/images/user/img-4.jpg";

const Clients = () => {
  const testimonials = [
    {
      id: 1,
      img: Img1,
      name: 'Sarah Johnson',
      age: 28,
      occupation: 'Marketing Manager',
      quote: 'This PCOS app has been a game-changer for me. I can now easily track my symptoms and receive personalized recommendations. It\'s like having a PCOS expert in my pocket!'
    },
    {
      id: 2,
      img: Img2,
      name: 'Emily Davis',
      age: 32,
      occupation: 'Fitness Instructor',
      quote: 'As a fitness instructor with PCOS, I love how this app integrates with my fitness tracker. It helps me understand the connection between my workouts and PCOS symptoms.'
    },
    {
      id: 3,
      img: Img3,
      name: 'Jessica Thompson',
      age: 25,
      occupation: 'Graphic Designer',
      quote: 'The community feature in this app is incredible. I no longer feel alone in my PCOS journey. Sharing experiences and tips with others has been so empowering.'
    },
    {
      id: 4,
      img: Img4,
      name: 'Hannah Wilson',
      age: 30,
      occupation: 'Teacher',
      quote: 'I appreciate how the app educates me about PCOS. The personalized health tips have helped me make positive lifestyle changes, and I\'ve seen a significant improvement in my symptoms.'
    },
  ];

  return (
    <section className="section bg-light" id="clients">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center mb-5">
              <h2 className="font-weight-bold mb-4">Real Stories from Our Users</h2>
              <p className="text-muted">
                After conducting extensive user interviews, we've discovered a significant demand for a comprehensive PCOS management solution. Here's what some of our users have to say about how our app has transformed their PCOS journey.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          {testimonials.map((testimonial, index) => (
            <Col lg={6} key={testimonial.id} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="testimonial-card bg-white p-4 rounded shadow">
                  <div className="d-flex align-items-center mb-4">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="rounded-circle mr-3"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h5 className="mb-0">{testimonial.name}</h5>
                      <p className="text-muted mb-0">
                        {testimonial.age} • {testimonial.occupation}
                      </p>
                    </div>
                  </div>
                  <FaQuoteLeft className="text-primary mb-3" size={24} />
                  <p className="text-muted">{testimonial.quote}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
        <Row className="mt-5">
          <Col lg={12}>
            <div className="text-center">
              <h3 className="mb-4">Join Thousands of Women Taking Control of Their PCOS</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg"
              >
                Download the App Now
              </motion.button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Clients;