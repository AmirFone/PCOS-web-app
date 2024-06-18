import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import hero3 from "../../assets/images/hero-3-bottom-img.png";

// Import Background Image
import { Link } from "react-router-dom";

class Section extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="hero-3-bg position-relative bg-soft-primary" id="home">
          <Container>
            <Row className="justify-content-center">
              <Col lg={7}>
              <div className="text-center">
                <h1 className="hero-3-title text-dark line-height-1_4">Create Amazing Landing Page With Nody Template</h1>
                <p className="text-muted mb-4 pb-3">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione sequinesciunt.</p>
                <Link to="#" className="btn btn-primary">Get Started <span className="ml-2 right-icon">&#8594;</span></Link>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="hero-bottom-shape">
          <img src={hero3} alt="" className="img-fluid d-block mx-auto" />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Section;
