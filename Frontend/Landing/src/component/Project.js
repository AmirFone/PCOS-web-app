import React, { Component } from "react";
import {
  Col,
  Container,
  Row
} from "reactstrap";

//import icon
import FeatherIcon from "feather-icons-react";

import { Link } from "react-router-dom";

// feature Image
import Img1 from "../assets/images/project/img-1.jpg";
import Img2 from "../assets/images/project/img-2.jpg";
import Img3 from "../assets/images/project/img-3.jpg";
import Img4 from "../assets/images/project/img-4.jpg";
import Img5 from "../assets/images/project/img-5.jpg";
import Img6 from "../assets/images/project/img-6.jpg";

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [
        {
          id: 1,
          img: Img1,
          title: 'Professional Designer',
          designation: 'UI/UX Designer'
        },
        {
          id: 2,
          img: Img2,
          title: 'Product Designer',
          designation: 'Web Designer'
        },
        {
          id: 3,
          img: Img3,
          title: 'Design Development',
          designation: 'PHP Developer'
        },
        {
          id: 4,
          img: Img4,
          title: 'Product Designer',
          designation: 'React Developer'
        },
        {
          id: 5,
          img: Img5,
          title: 'Design Development',
          designation: 'UI/UX Designer'
        },
        {
          id: 6,
          img: Img6,
          title: 'Graphic Development',
          designation: 'Web Designer'
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <section className="section bg-light" id="project">
          <Container>
            <Row className="justify-content-center">
              <div className="col-lg-7">
                <div className="text-center mb-5">
                  <h2 className="">Our Latest Project</h2>
                  <p className="text-muted">Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi commodi consequatur.</p>
                </div>
              </div>
            </Row>
            <Row>
              {/* Render Footer Link */}
              {this.state.projects.map((item, key) => (
                <Col lg={4} md={6} key={key}>
                  <div className="project-box mb-4">
                    <div className="position-relative overflow-hidden rounded">
                      <img src={item.img} alt="" className="img-fluid d-block mx-auto shadow" />
                      <div className="project-overlay">
                        <div className="project-content">
                          <Link to="#">
                            <div className="project-icon">
                              <i>
                                <FeatherIcon icon="eye" />
                              </i>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="f-17 mb-1">
                        <Link to="#" className="text-dark">{item.title}</Link>
                      </h4>
                      <p className="text-muted">{item.designation}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}
