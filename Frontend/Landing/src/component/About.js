import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

// Import Background Image
import Img1 from "../assets/images/about/img-1.png";
import Img2 from "../assets/images/about/img-2.png";

//import icon
import FeatherIcon from "feather-icons-react";

export default class About extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="section" id="about">
          <Container>
            <Row className="justify-content-center">
              <Col lg={7}>
                <div className="text-center mb-5">
                  <h2 className="">About Us</h2>
                  <p className="text-muted">Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi commodi consequatur.</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <h2 className="fw-normal line-height-1_4 mb-4">Productive & Customizable For <span className="fw-medium">Developers</span></h2>
                <p className="text-muted mb-4">Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil atque corrupti molestiae.</p>
                <p className="f-17 text-muted"><FeatherIcon className="icon-xs text-primary icon-fill-primary icon mr-2" icon="grid" /> 
                  Marketing program activities</p>
                <p className="f-17 text-muted"><FeatherIcon className="icon-xs text-primary icon-fill-primary icon mr-2" icon="layout" />   Customization product</p>
                <p className="f-17 text-muted mb-4"><FeatherIcon className="icon-xs text-primary icon-fill-primary icon mr-2" icon="monitor" />   At vero eos accusamus iusto</p>
                <Link to="#" className="read-more f-18">More Information <span className="ml-2 right-icon f-24">&#8594;</span></Link>
              </Col>
              <Col lg={4}>
                <div className="card border-0">
                  <div className="bg-soft-primary about-img rounded">
                  <img src={Img1} alt="" className="img-fluid d-block mx-auto" />
                  </div>
                  <div className="mt-3">
                    <p className="text-uppercase text-muted mb-2 f-13">Development</p>
                    <h4 className="f-18">Product Development</h4>
                    <p className="text-muted">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni.</p>
                    <Link to="#" className="read-more">Read More <span className="ml-2 right-icon">&#8594;</span></Link>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="card border-0">
                  <div className="bg-soft-info about-img rounded">
                    <img src={Img2} alt="" className="img-fluid d-block mx-auto" />
                  </div>
                  <div className="mt-3">
                    <p className="text-uppercase text-muted mb-2 f-13">Marketing</p>
                    <h4 className="f-18"> Marketing Product</h4>
                    <p className="text-muted">Temporibus autem quibusdam a officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae.</p>
                    <Link to="#" className="read-more">Read More <span className="ml-2 right-icon">&#8594;</span></Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}
