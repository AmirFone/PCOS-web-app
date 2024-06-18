import React, { Component } from "react";
import {
    Col,
    Container,
    Row
} from "reactstrap";

//import icon
import FeatherIcon from "feather-icons-react";


// Import News Image
import Img1 from "../assets/images/blog/img-1.jpg";
import Img2 from "../assets/images/blog/img-2.jpg";
import Img3 from "../assets/images/blog/img-3.jpg";
import Img4 from "../assets/images/blog/img-4.jpg";
import { Link } from "react-router-dom";

export default class News extends Component {
    render() {
      return (
        <React.Fragment>
          <section className="section bg-light">
            <Container>
              <Row className="justify-content-center">
                <Col lg={7}>
                  <div className="text-center mb-5">
                    <h2>PCOS Resources</h2>
                    <p className="text-muted">
                      Stay informed and empowered with our curated collection of PCOS articles, blog posts, and research findings.
                    </p>
                  </div>
                </Col>
              </Row>
  
              <Row>
                <Col lg={4}>
                  <div className="blog-box mb-4">
                    <img src={Img1} alt="" className="img-fluid d-block mx-auto rounded shadow" />
                    <div className="mt-3">
                      <h5 className="f-17 mb-1">
                        <Link to="/article1" className="text-dark">
                          Understanding PCOS: Symptoms, Causes, and Diagnosis
                        </Link>
                      </h5>
                      <p className="text-muted">
                        Learn the basics of PCOS, including common symptoms, potential causes, and the diagnostic process.
                      </p>
                    </div>
                  </div>
                </Col>
  
                <Col lg={4}>
                  <div className="blog-box mb-4">
                    <img src={Img2} alt="" className="img-fluid d-block mx-auto rounded shadow" />
                    <div className="mt-3">
                      <h5 className="f-17 mb-1">
                        <Link to="/article2" className="text-dark">
                          Lifestyle Changes for Managing PCOS
                        </Link>
                      </h5>
                      <p className="text-muted">
                        Discover effective lifestyle modifications that can help manage PCOS symptoms and improve overall health.
                      </p>
                    </div>
                  </div>
                </Col>
  
                <Col lg={4}>
                  <div className="blog-box mb-4">
                    <img src={Img3} alt="" className="img-fluid d-block mx-auto rounded shadow" />
                    <div className="mt-3">
                      <h5 className="f-17 mb-1">
                        <Link to="/article3" className="text-dark">
                          The Role of Nutrition in PCOS Management
                        </Link>
                      </h5>
                      <p className="text-muted">
                        Explore the importance of a balanced diet for women with PCOS and learn about nutrient-rich food choices.
                      </p>
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