import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

// Import Background Image
import { Link } from "react-router-dom";

import Background from "../../assets/images/hero-2-overlay.png";
import hero2 from "../../assets/images/hero-2-bottom-shape.png";

class Section extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="hero-2-bg bg-primary position-relative" id="home">
        <div className="hero-overlay hero-2-overlay" style={{ backgroundImage: `url(${Background})` }}></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg="6">
              <div className="text-center">
                <span className="badge bg-soft-light text-white-70 f-15 mb-4">Creative Landing Page</span>
                <h1 className="hero-2-title mb-4 text-white">Make Your Site Amazing & Unique</h1>
                <p className="text-white-50 mb-4 pb-3">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione sequinesciunt.</p>
                <Link to="#" className="btn btn-light">Get Started <span className="ml-2 right-icon">&#8594;</span></Link>
              </div>
            </Col>
          </Row>
        </Container>
        
        <div className="hero-bottom-shape">
            <img src={hero2} alt="" className="img-fluid d-block mx-auto" />
        </div>
    </section>
      </React.Fragment>
    );
  }
}

export default Section;
