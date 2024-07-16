import React, { Component } from "react";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from 'classnames';
import { FaHeartbeat, FaWeight, FaBookMedical } from "react-icons/fa";

// Import Image
import Img1 from "../assets/images/features/img-1.png";
import Img2 from "../assets/images/features/img-2.png";
import Img3 from "../assets/images/features/img-3.png";

class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "v-pills-symptom-tracking",
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <section className="section" id="features">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8}>
                <div className="text-center mb-5">
                  <h2 className="mb-3">Key Features of Our PCOS App</h2>
                  <p className="text-muted">Our app is designed to support women and people with PCOS in managing their symptoms and improving their overall health.</p>
                </div>
              </Col>
            </Row>
            <div className="features-content">
              <Row className="align-items-center">
                <Col lg={6} className="order-2 order-lg-1">
                  <TabContent id="v-pills-tabContent" activeTab={this.state.activeTab}>
                    <TabPane tabId="v-pills-symptom-tracking" className="fade show">
                      <img src={Img1} alt="Symptom Tracking" className="img-fluid d-block mx-auto" />
                    </TabPane>
                    <TabPane tabId="v-pills-personalized-recommendations" className="fade show">
                      <img src={Img2} alt="Personalized Recommendations" className="img-fluid d-block mx-auto" />
                    </TabPane>
                    <TabPane tabId="v-pills-educational-resources" className="fade show">
                      <img src={Img3} alt="Educational Resources" className="img-fluid d-block mx-auto" />
                    </TabPane>
                  </TabContent>
                </Col>
                <Col lg={5} className="offset-lg-1 order-1 order-lg-2">
                  <Nav className="flex-column" pills id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {this.renderFeatureItem("v-pills-symptom-tracking", <FaHeartbeat />, "Symptom Tracking", "Easily log and monitor your PCOS-related symptoms to better understand your condition and identify patterns.")}
                    {this.renderFeatureItem("v-pills-personalized-recommendations", <FaWeight />, "Personalized Recommendations", "Receive tailored lifestyle suggestions based on your unique symptoms and goals.")}
                    {this.renderFeatureItem("v-pills-educational-resources", <FaBookMedical />, "Educational Resources", "Access a wealth of articles, videos, and expert advice to help you better understand PCOS.")}
                  </Nav>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </React.Fragment>
    );
  }

  renderFeatureItem(id, icon, title, description) {
    return (
      <NavItem className="mb-4">
        <NavLink
          href="#"
          className={classnames({ active: this.state.activeTab === id }, "rounded p-3")}
          onClick={() => { this.toggleTab(id); }}
          id={`${id}-tab`}
        >
          <div className="d-flex align-items-center">
            <div className="icon mr-4 flex-shrink-0">
              {React.cloneElement(icon, { size: 32, color: "#8563F2" })}
            </div>
            <div>
              <h4 className="text-dark mb-2">{title}</h4>
              <p className="text-muted mb-2">{description}</p>
              <p className="text-primary mb-0 read-more">
                Learn More<span className="ml-2">&#8594;</span>
              </p>
            </div>
          </div>
        </NavLink>
      </NavItem>
    );
  }
}

export default Feature;