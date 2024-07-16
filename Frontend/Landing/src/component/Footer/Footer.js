import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

// Footer Image
import footer_image from "../../assets/images/hero-1-bg-img.png";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Footer Start */}
        <footer
          className="footer"
          style={{ backgroundImage: `url(${footer_image})` }}
        >
          <Container>
            <Row>
              <Col md={4}>
                <h4 className="text-white f-22 fw-normal mb-3">PCOS Resources</h4>
                <ul className="list-unstyled footer-sub-menu">
                  <li><Link className="footer-link" to="/blog">PCOS Blog</Link></li>
                  <li><Link className="footer-link" to="/community">PCOS Community</Link></li>
                  <li><Link className="footer-link" to="/faq">PCOS FAQ</Link></li>
                </ul>
              </Col>
              <Col md={4}>
                <h4 className="text-white f-22 fw-normal mb-3">Company</h4>
                <ul className="list-unstyled footer-sub-menu">
                  <li><Link className="footer-link" to="/about">About Us</Link></li>
                  <li><Link className="footer-link" to="/contact">Contact Us</Link></li>
                  <li><Link className="footer-link" to="/privacy">Privacy Policy</Link></li>
                  <li><Link className="footer-link" to="/terms">Terms of Service</Link></li>
                </ul>
              </Col>
              <Col md={4}>
                <h4 className="text-white f-22 fw-normal mb-3">Support</h4>
                <ul className="list-unstyled footer-sub-menu">
                  <li><Link className="footer-link" to="/support">Help Center</Link></li>
                  <li><Link className="footer-link" to="/contact">Report a Bug</Link></li>
                  <li><Link className="footer-link" to="/contact">Submit Feedback</Link></li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-5">
                  <p className="text-white-50 f-15 mb-0">
                    {new Date().getFullYear()} © PCOS Resources. All Rights Reserved. Designed by PCOS Resources
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
        {/* Footer End */}
      </React.Fragment>
    );
  }
}

export default Footer;