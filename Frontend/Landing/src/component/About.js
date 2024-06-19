import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { FaHeartbeat, FaUsers, FaBookMedical } from "react-icons/fa";

export default class About extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="section" id="about">
          <Container>
            <Row className="justify-content-center">
              <Col lg={7}>
                <div className="text-center mb-5">
                  <h2 className="">About Our PCOS Solution</h2>
                  <p className="text-muted">Our mission is to empower women with Polycystic Ovary Syndrome (PCOS) by providing a comprehensive mobile app that helps them manage their symptoms, access personalized recommendations, and connect with PCOS specialists in their area. We understand the challenges faced by women with PCOS and aim to simplify their journey towards better health and well-being.</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div className="card border-0 mb-4">
                  <div className="card-body">
                    <div className="icon-box mb-4">
                      <FaHeartbeat size={48} color="#8563F2" />
                    </div>
                    <h4 className="f-18">Symptom Management</h4>
                    <p className="text-muted">Our app allows you to easily track your PCOS symptoms, helping you identify patterns and triggers. This information can be shared with your healthcare provider to develop a personalized treatment plan.</p>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="card border-0 mb-4">
                  <div className="card-body">
                    <div className="icon-box mb-4">
                      <FaUsers size={48} color="#8563F2" />
                    </div>
                    <h4 className="f-18">Community Support</h4>
                    <p className="text-muted">Connect with a supportive community of women who understand the challenges of living with PCOS. Share experiences, ask questions, and find encouragement on your journey to better health.</p>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="card border-0 mb-4">
                  <div className="card-body">
                    <div className="icon-box mb-4">
                      <FaBookMedical size={48} color="#8563F2" />
                    </div>
                    <h4 className="f-18">Expert Resources</h4>
                    <p className="text-muted">Access a curated library of articles, videos, and podcasts featuring expert advice on managing PCOS. Learn about the latest research, treatment options, and lifestyle strategies to help you thrive.</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={7}>
                <div className="text-center">
                  <p className="text-muted mb-4">Our goal is to provide you with the tools, knowledge, and support you need to take control of your PCOS and live your best life.</p>
                  <Link to="#" className="btn btn-primary">Learn More</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}