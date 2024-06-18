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
                        <Row className=" justify-content-center">
                            <Col lg={7}>
                                <div className="text-center mb-5">
                                    <h2>Latest News</h2>
                                    <p className="text-muted">Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi commodi consequatur.</p>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <div className="blog-box mb-4 mb-lg-0">
                                    <img src={Img1} alt="" className="img-fluid d-block mx-auto rounded shadow" />
                                </div>
                            </Col>

                            <Col lg={6}>
                                <div className="blog-box">
                                    <div className="d-flex blog-box-content align-items-center">
                                        <img src={Img2} alt="" className="img-fluid d-block rounded shadow blog-img me-3 flex-shrink-0" />
                                        <div className="flex-grow-1">
                                            <h5 className="f-17 mb-1"><Link to="#" className="text-dark">The Big Event Conference</Link></h5>
                                            <p className="text-muted f-15">At vero eos et accusamus et iusto dignissimos.</p>
                                            <ul className="list-inline text-muted f-14 mb-0">
                                                <li className="list-inline-item"> <FeatherIcon className="icon-size-15 mr-1 icon" icon="calendar" />{" "}07 Jan 2020</li>{" "}
                                                <li className="list-inline-item"> <FeatherIcon className="icon-size-15 mr-1 icon" icon="clock" />{" "}15 min ago</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d-flex blog-box-content align-items-center">
                                        <img src={Img3} alt="" className="img-fluid d-block rounded shadow blog-img me-3 flex-shrink-0" />
                                        <div className="flex-grow-1">
                                            <h5 className="f-17 mb-1"><Link to="#" className="text-dark">Best Family House For You</Link></h5>
                                            <p className="text-muted f-15">At vero eos et accusamus et iusto dignissimos.</p>
                                            <ul className="list-inline text-muted f-14 mb-0">
                                                <li className="list-inline-item"> <FeatherIcon className="icon-size-15 mr-1 icon" icon="calendar" />{" "}07 Jan 2020</li>{" "}
                                                <li className="list-inline-item"> <FeatherIcon className="icon-size-15 mr-1 icon" icon="clock" />{" "}20 min ago</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d-flex blog-box-content align-items-center">
                                        <img src={Img4} alt="" className="img-fluid d-block rounded shadow blog-img me-3 flex-shrink-0" />
                                        <div className="flex-grow-1">
                                            <h5 className="f-17 mb-1"><Link to="#" className="text-dark">Business Metting Places</Link></h5>
                                            <p className="text-muted f-15">At vero eos et accusamus et iusto dignissimos.</p>
                                            <ul className="list-inline text-muted f-14 mb-0">
                                                <li className="list-inline-item"> <FeatherIcon className="icon-size-15 mr-1 icon" icon="calendar" />{" "}07 Jan 2020</li>{" "}
                                                <li className="list-inline-item"> <FeatherIcon className="icon-size-15 mr-1 icon" icon="clock" />{" "}30 min ago</li>
                                            </ul>
                                        </div>
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
