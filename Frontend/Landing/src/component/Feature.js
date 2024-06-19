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
              <Col lg={7}>
                <div className="text-center mb-5">
                  <h2 className="">Key Features of Our PCOS App</h2>
                  <p className="text-muted">Our app is designed to support women and people with PCOS in managing their symptoms and improving their overall health.</p>
                </div>
              </Col>
            </Row>
            <div className="features-content">
              <Row className="align-items-center">
                <Col lg={6} className="order-2 order-lg-1">
                  <TabContent id="v-pills-tabContent" activeTab={this.state.activeTab}>
                    <TabPane tabId="v-pills-symptom-tracking" className="fade show">
                      <img src={Img1} alt="" className="img-fluid d-block mx-auto" />
                    </TabPane>
                    <TabPane tabId="v-pills-personalized-recommendations" className="fade show">
                      <img src={Img2} alt="" className="img-fluid d-block mx-auto" />
                    </TabPane>
                    <TabPane tabId="v-pills-educational-resources" className="fade show">
                      <img src={Img3} alt="" className="img-fluid d-block mx-auto" />
                    </TabPane>
                  </TabContent>
                </Col>
                <Col lg={5} className="offset-lg-1 order-1 order-lg-2">
                  <Nav className="flex-column" pills id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <NavItem>
                      <NavLink href="#" className={classnames({ active: this.state.activeTab === 'v-pills-symptom-tracking' }, "rounded")} onClick={() => { this.toggleTab('v-pills-symptom-tracking'); }} id="v-pills-symptom-tracking-tab">
                        <div className="d-flex align-items-center">
                          <div className="icon mr-3">
                            <FaHeartbeat size={24} color="#8563F2" />
                          </div>
                          <div>
                            <h4 className="text-dark f-18">Symptom Tracking</h4>
                            <p className="text-muted f-15">Easily log and monitor your PCOS-related symptoms to better understand your condition and identify patterns.</p>
                            <p className="text-primary mb-0 read-more">Learn More<span className="right-icon ml-2">&#8594;</span></p>
                          </div>
                        </div>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" className={classnames({ active: this.state.activeTab === 'v-pills-personalized-recommendations' }, "rounded")} onClick={() => { this.toggleTab('v-pills-personalized-recommendations'); }} id="v-pills-personalized-recommendations-tab">
                        <div className="d-flex align-items-center">
                          <div className="icon mr-3">
                            <FaWeight size={24} color="#8563F2" />
                          </div>
                          <div>
                            <h4 className="text-dark f-18">Personalized Recommendations</h4>
                            <p className="text-muted f-15">Receive tailored lifestyle suggestions based on your unique symptoms and goals.</p>
                            <p className="text-primary mb-0 read-more">Learn More<span className="right-icon ml-2">&#8594;</span></p>
                          </div>
                        </div>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" className={classnames({ active: this.state.activeTab === 'v-pills-educational-resources' }, "rounded")} onClick={() => { this.toggleTab('v-pills-educational-resources'); }} id="v-pills-educational-resources-tab">
                        <div className="d-flex align-items-center">
                          <div className="icon mr-3">
                            <FaBookMedical size={24} color="#8563F2" />
                          </div>
                          <div>
                            <h4 className="text-dark f-18">Educational Resources</h4>
                            <p className="text-muted f-15">Access a wealth of articles, videos, and expert advice to help you better understand PCOS.</p>
                            <p className="text-primary mb-0 read-more">Learn More<span className="right-icon ml-2">&#8594;</span></p>
                          </div>
                        </div>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Feature;