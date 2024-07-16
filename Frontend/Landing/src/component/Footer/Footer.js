import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// Footer Image
import footer_image from "../../assets/images/hero-1-bg-img.png";

const Footer = () => {
  return (
    <footer className="footer py-5" style={{ backgroundImage: `url(${footer_image})` }}>
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <h4 className="text-white mb-4">PCOS Resources</h4>
            <p className="text-white-50 mb-4">Empowering women with PCOS through knowledge, support, and innovative solutions.</p>
            <div className="d-flex">
              <a href="#" className="me-3 text-white-50 hover-primary"><FaFacebookF size={20} /></a>
              <a href="#" className="me-3 text-white-50 hover-primary"><FaTwitter size={20} /></a>
              <a href="#" className="me-3 text-white-50 hover-primary"><FaInstagram size={20} /></a>
              <a href="#" className="text-white-50 hover-primary"><FaLinkedinIn size={20} /></a>
            </div>
          </Col>
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-4">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/blog" className="text-white-50 hover-primary">PCOS Blog</Link></li>
              <li><Link to="/community" className="text-white-50 hover-primary">Community</Link></li>
              <li><Link to="/faq" className="text-white-50 hover-primary">FAQs</Link></li>
              <li><Link to="/resources" className="text-white-50 hover-primary">Resources</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-4">Company</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/about" className="text-white-50 hover-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-white-50 hover-primary">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-white-50 hover-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white-50 hover-primary">Terms of Service</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="text-white mb-4">Newsletter</h5>
            <p className="text-white-50 mb-4">Stay updated with our latest news and resources.</p>
            <form className="mb-3">
              <div className="input-group">
                <input type="email" className="form-control bg-dark border-0 text-white" placeholder="Enter your email" aria-label="Enter your email" />
                <button className="btn btn-primary" type="submit">Subscribe</button>
              </div>
            </form>
          </Col>
        </Row>
        <hr className="bg-white-50 my-4" />
        <Row>
          <Col className="text-center">
            <p className="text-white-50 mb-0">
              © {new Date().getFullYear()} PCOS Resources. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;