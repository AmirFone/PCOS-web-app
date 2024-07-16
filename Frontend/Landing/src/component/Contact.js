import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { db } from "../firebase"; // Adjust the path as needed
import { collection, addDoc } from "firebase/firestore";

// Import Background Image
import ContactImg from "../assets/images/contact-img.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pcosType: "",
    concerns: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        timestamp: new Date()
      });
      setSubmitMessage("Message sent successfully!");
      setFormData({ name: "", email: "", pcosType: "", concerns: "" });
    } catch (error) {
      console.error("Error sending message: ", error);
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <section className="section" id="contact">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7}>
              <div className="text-center mb-5">
                <h2 className="">Contact Us</h2>
                <p className="text-muted">
                  Have questions about our PCOS app or need support? Reach out to us using the form below, or interact with our AI-powered PCOS assistant for personalized guidance.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col lg={6} md={10}>
              <div className="mb-5 mb-lg-0">
                <div className="text-center">
                  <img src={ContactImg} alt="" className="img-fluid d-block w-75 mx-auto" />
                  <h4 className="mt-4">Introducing Our AI-Powered PCOS Assistant</h4>
                  <p className="text-muted mb-4">
                    Chat with our AI assistant, powered by GPT, to get personalized advice and support tailored to your unique PCOS journey. Our AI assistant is contextually aware of your symptoms, goals, and progress, providing you with relevant information and guidance every step of the way.
                  </p>
                  <Link to="#" className="btn btn-primary">
                    <FaRobot className="mr-2" /> Chat with AI Assistant
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={5} className="offset-lg-1">
              <h4 className="line-height-1_4 mb-4">Send Us a Message</h4>
              <div className="custom-form mt-4 mt-lg-0">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="app-label">
                        <Label for="name" className="form-label">Name</Label>
                        <Input 
                          name="name" 
                          id="name" 
                          type="text" 
                          className="form-control" 
                          placeholder="Enter your name..." 
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="app-label">
                        <Label for="email" className="form-label">Email address</Label>
                        <Input 
                          name="email" 
                          id="email" 
                          type="email" 
                          className="form-control" 
                          placeholder="Enter your email..." 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup className="app-label">
                        <Label for="pcosType" className="form-label">Type of PCOS</Label>
                        <Input 
                          type="select" 
                          name="pcosType" 
                          id="pcosType" 
                          className="form-control"
                          value={formData.pcosType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select...</option>
                          <option value="Insulin-resistant PCOS">Insulin-resistant PCOS</option>
                          <option value="Inflammatory PCOS">Inflammatory PCOS</option>
                          <option value="Adrenal PCOS">Adrenal PCOS</option>
                          <option value="Other">Other</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup className="app-label">
                        <Label for="concerns" className="form-label">Primary Concerns</Label>
                        <Input 
                          name="concerns" 
                          id="concerns" 
                          type="textarea" 
                          rows="4" 
                          className="form-control" 
                          placeholder="Enter your primary concerns..." 
                          value={formData.concerns}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <Button color="primary" type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                      {submitMessage && <div className="mt-3 text-center">{submitMessage}</div>}
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Contact;