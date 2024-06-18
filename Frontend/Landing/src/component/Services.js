import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

// Import Background Image
import Background from "../assets/images/service-icon-bg.png";
import Icon1 from "../assets/images/services-icon/icon-1.png";
import Icon2 from "../assets/images/services-icon/icon-2.png";
import Icon3 from "../assets/images/services-icon/icon-3.png";
import { Link } from "react-router-dom";

export default class Services extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="section bg-light" id="services">
          <Container>
            <Row className="justify-content-center">
              <Col lg={7}>
                <div className="text-center mb-5">
                  <h2 className="">Our Services</h2>
                  <p className="text-muted">Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi commodi consequatur.</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div className="card service-box text-center p-4">
                  <div className="service-icon-bg mx-auto avatar-xxl p-4" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="service-box-icon justify-content-center">
                      <img src={Icon1} alt="" className="img-fluid d-block" />
                    </div>
                  </div>
                  <h4 className="service-title mt-4 mb-3 f-18">Awesome Support</h4>
                  <p className="service-subtitle mb-4 f-15">Omnicos directe al desirabilite de une nov lingua franca a refusa continuar payar custosi traductores.</p>
                  <Link to="#" className="read-more">More<span className="right-icon ml-2">&#8594;</span></Link>
                </div>
              </Col>
              <Col lg={4}>
                <div className="card service-box text-center p-4">
                  <div className="service-icon-bg mx-auto avatar-xxl p-4" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="service-box-icon justify-content-center">
                      <img src={Icon2} alt="" className="img-fluid d-block" />
                    </div>
                  </div>
                  <h4 className="service-title mt-4 mb-3 f-18">Analytics Security</h4>
                  <p className="service-subtitle mb-4 f-15">Omnicos directe al desirabilite de une nov lingua franca a refusa continuar payar custosi traductores.</p>
                  <Link to="#" className="read-more">More<span className="right-icon ml-2">&#8594;</span></Link>
                </div>
              </Col>
              <Col lg={4}>
                <div className="card service-box text-center p-4">
                  <div className="service-icon-bg mx-auto avatar-xxl p-4" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="service-box-icon justify-content-center">
                      <img src={Icon3} alt="" className="img-fluid d-block" />
                    </div>
                  </div>
                  <h4 className="service-title mt-4 mb-3 f-18">Data Privacy</h4>
                  <p className="service-subtitle mb-4 f-15">Omnicos directe al desirabilite de une nov lingua franca a refusa continuar payar custosi traductores.</p>
                  <Link to="#" className="read-more">More<span className="right-icon ml-2">&#8594;</span></Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}
