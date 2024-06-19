import React, { Component } from "react";
import {Row, Col } from 'reactstrap';

class Footer_link extends Component {
  render() {
    return (
        // Footer Link start
        <Row>
        <Col lg={12}>
            <div className="text-center mt-5">
                <p className="text-white-50 f-15 mb-0">
                    {(new Date().getFullYear())}{" "}
                     © PCOS Resources. All Rights Reserved. Designed by PCOS Resources
                </p>
            </div>
        </Col>
    </Row>
    //   Footer Link End
    );
  }
}

export default Footer_link;
