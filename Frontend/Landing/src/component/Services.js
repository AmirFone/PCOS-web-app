import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

// Import Icons
import { FaHeartbeat, FaClinicMedical, FaBookMedical } from "react-icons/fa";

export default class Services extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="section bg-light" id="services">
          <Container>
            <Row className="justify-content-center">
              <Col lg={7}>
                <div className="text-center mb-5">
                  <h2 className="">Our Planned Features</h2>
                  <p className="text-muted">We are developing a comprehensive app to support women with PCOS in managing their symptoms and improving their overall health.</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div className="card service-box text-center p-4">
                  <div className="service-icon-bg mx-auto avatar-xxl p-4">
                    <div className="service-box-icon justify-content-center">
                      <FaHeartbeat size={48} color="#8563F2" />
                    </div>
                  </div>
                  <h4 className="service-title mt-4 mb-3 f-18">Symptom Tracking</h4>
                  <p className="service-subtitle mb-4 f-15">Easily log and monitor your PCOS-related symptoms, including menstrual changes, to better understand your condition and identify patterns.</p>
                  <Link to="#" className="read-more">Learn More<span className="right-icon ml-2">&#8594;</span></Link>
                </div>
              </Col>
              <Col lg={4}>
                <div className="card service-box text-center p-4">
                  <div className="service-icon-bg mx-auto avatar-xxl p-4">
                    <div className="service-box-icon justify-content-center">
                      <FaClinicMedical size={48} color="#8563F2" />
                    </div>
                  </div>
                  <h4 className="service-title mt-4 mb-3 f-18">Personalized Recommendations</h4>
                  <p className="service-subtitle mb-4 f-15">Receive tailored lifestyle suggestions, such as workouts, diet plans, and stress-management techniques like yoga, based on your unique symptoms and goals.</p>
                  <Link to="#" className="read-more">Learn More<span className="right-icon ml-2">&#8594;</span></Link>
                </div>
              </Col>
              <Col lg={4}>
                <div className="card service-box text-center p-4">
                  <div className="service-icon-bg mx-auto avatar-xxl p-4">
                    <div className="service-box-icon justify-content-center">
                      <FaBookMedical size={48} color="#8563F2" />
                    </div>
                  </div>
                  <h4 className="service-title mt-4 mb-3 f-18">Educational Resources</h4>
                  <p className="service-subtitle mb-4 f-15">Access a wealth of articles, videos, and expert advice to help you better understand PCOS and make informed decisions about your health.</p>
                  <Link to="#" className="read-more">Learn More<span className="right-icon ml-2">&#8594;</span></Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}