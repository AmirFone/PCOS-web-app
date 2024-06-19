import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";

// Import Background Image
import ContactImg from "../assets/images/contact-img.png";

export default class Contact extends Component {
  render() {
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
                    <p className="mt-4">Or reach out to our support team:</p>
                    <Row>
                      <Col md={6}>
                        <Link to="#">
                          <div className="badge f-14 bg-soft-dark text-muted">
                            <span className="text-dark mr-1">Email:</span> info@pcosapp.com
                          </div>
                        </Link>
                      </Col>
                      <Col md={6} className="mt-2 mt-sm-0">
                        <Link to="#">
                          <div className="badge f-14 bg-soft-dark text-muted">
                            <span className="text-dark mr-1">Phone:</span> (123) 456-7890
                          </div>
                        </Link>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={5} className="offset-lg-1">
                <h4 className="line-height-1_4 mb-4">Send Us a Message</h4>
                <div className="custom-form mt-4 mt-lg-0">
                  <div id="message"></div>
                  <Form method="post" name="contact-form" id="contact-form">
                    <Row>
                      <Col md={6}>
                        <FormGroup className="app-label">
                          <Label for="name" className="form-label">Name</Label>
                          <Input name="name" id="name" type="text" className="form-control" placeholder="Enter your name..." />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup className="app-label">
                          <Label for="email" className="form-label">Email address</Label>
                          <Input name="email" id="email" type="email" className="form-control" placeholder="Enter your email..." />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup className="app-label">
                          <Label for="subject" className="form-label">Type of PCOS</Label>
                          <Input type="select" name="subject" id="subject" className="form-control">
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
                          <Label for="comments" className="form-label">Primary Concerns</Label>
                          <Input name="comments" id="comments" type="textarea" rows="4" className="form-control" placeholder="Enter your primary concerns..." />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Button color="primary" id="submit" name="send" className="btn btn-primary">
                          Send Message
                        </Button>
                        <div id="simple-msg"></div>
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
  }
}