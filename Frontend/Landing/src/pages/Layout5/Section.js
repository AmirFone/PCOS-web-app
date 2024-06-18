import React, { Component } from "react";
import { Col, Container } from "reactstrap";

// Import Background Image
import hero5 from "../../assets/images/hero-5-img.png";
import { Link } from "react-router-dom";

class Section extends Component {
  render() {
    return (
      <React.Fragment>
        <section class="hero-5-bg position-relative bg-light" id="home">
          <Container>
            <div class="row align-items-center">
              <Col lg={6}>
                <div>
                  <h1 class="hero-5-title line-height-1_4 mb-4">Create Amazing Landing Page With <span class="text-primary">Nody</span></h1>
                  <p class="text-muted mb-4 pb-3">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione sequinesciunt.</p>
                  <div class="Subcribe-form">
                    <form class="d-flex">
                      <div class="form-group flex-grow-1">
                        <input type="email" class="form-control me-md-3" id="inputEmail2" placeholder="Enter Your Email..." />
                      </div>
                      <Link to="#" type="submit" class="btn btn-primary flex-shrink-0">Subscribe</Link>
                    </form>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <img src={hero5} alt="" className="hero-5-img" />
              </Col>
            </div>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Section;
