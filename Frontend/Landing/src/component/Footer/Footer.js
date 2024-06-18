import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import FooterLink from "../Footer/Footer_link";

// Footer Image
import footer_image from "../../assets/images/hero-1-bg-img.png";

import logolight from "../../assets/images/logo-light.png";
// Import Logo

//import icon
import FeatherIcon from "feather-icons-react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {
          id: 1,
          title: "Customer",
          child: [
            { title: "Works", link: "/" },
            { title: "Strategy", link: "/" },
            { title: "Releases", link: "/" },
            { title: "Press", link: "/" },
            { title: "Mission", link: "/" },
          ],
        },
        {
          id: 2,
          title: "Product",
          child: [
            { title: "Tranding", link: "/" },
            { title: "Popular", link: "/" },
            { title: "Customers", link: "/" },
            { title: "Features", link: "/" },
          ],
        },
        {
          id: 3,
          title: "Learn More",
          child: [
            { title: "Developers", link: "/" },
            { title: "Support", link: "/" },
            { title: "Customer Service", link: "/" },
            { title: "Get Started", link: "/" },
            { title: "Guide", link: "/" },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        {/* Footer Start */}
        <footer
          className="footer"
          style={{ backgroundImage: "url(" + footer_image + ")" }}
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
            {/* Render Footer Link End */}
            <FooterLink />
          </Container>
        </footer>
        {/* Footer End */}
      </React.Fragment>
    );
  }
}

export default Footer;
