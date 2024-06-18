import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

import Slider from "react-slick";

// Import client   Image
import Icon from "../assets/images/testi-icon.png";
import Img1 from "../assets/images/user/img-1.jpg";
import Img2 from "../assets/images/user/img-2.jpg";
import Img3 from "../assets/images/user/img-3.jpg";
import Img4 from "../assets/images/user/img-4.jpg";

export default class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          img: Img1,
          name: 'Joshua Vargas',
          designation: 'Web Developer, USA'
        },
        {
          id: 2,
          img: Img2,
          name: 'Sammie Lewis',
          designation: 'UI/UX Designer, USA'
        },
        {
          id: 3,
          img: Img3,
          name: 'Sarah Levine',
          designation: 'PHP Developer, USA'
        },
        {
          id: 4,
          img: Img4,
          name: 'Bobby Kelly',
          designation: 'Graphic Designer, USA'
        },
      ],
    };
  }
  render() {
    var settings = {
      dots: true,
      speed: 300,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows:false,
      centerPadding : '20px',
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            infinite: true,
            centerPadding : '20px'
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,  
            infinite: true,
            centerPadding : '20px'
          }
        },
        {
          breakpoint: 0,
          settings: {
            slidesToShow: 1,  
            infinite: true,
            centerPadding : '20px'
          }
        }
      ]
    };

    const slides = this.state.items.map((item, key) => {
      return (
        <div className="item" key={key}>
          <div className="testi-box text-center m-2">
            <div className="card border-0 shadow p-4 mb-4">
              <div className="mt-1 mb-3">
                <img src={Icon} alt="" className="testi-icon img-fluid d-block mx-auto w-auto" />
              </div>
              <p className="text-muted mb-0 f-15">Et harum quidem rerum facilis expedita distinctio nam libero tempore soluta nobis optio cumque.</p>
            </div>
            <div className="test-user-info">
              <div className="avatar-md mx-auto">
                <img src={item.img} alt="" className="img-fluid d-block rounded-circle testi-user-img" />
              </div>
              <h5 className="f-17 mt-3 mb-1">{item.name}</h5>
              <p className="text-muted f-14">{item.designation}</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <section className="section" id="clients">
          <Container>
            <Row className="justify-content-center">
              <Col lg={7}>
                <div className="text-center mb-5">
                  <h2 className="">What Our Customers Say</h2>
                  <p className="text-muted">Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi commodi consequatur.</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
              <div
                  id="testi-clients"
                  className="owl-carousel owl-theme testi-content"
                >
                <Slider {...settings}>
                  {slides}
                </Slider>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}
