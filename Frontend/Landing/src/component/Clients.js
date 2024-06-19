import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import Slider from "react-slick";

// Import client Image
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
          name: 'Sarah Johnson',
          quote: 'The PCOS app has been a lifesaver for me. It has helped me track my symptoms, learn more about my condition, and connect with a supportive community.'
        },
        {
          id: 2,
          img: Img2,
          name: 'Emily Davis',
          quote: 'I love how easy it is to use this app to log my symptoms and get personalized recommendations. It has empowered me to take control of my PCOS journey.'
        },
        {
          id: 3,
          img: Img3,
          name: 'Jessica Thompson',
          quote: 'As someone newly diagnosed with PCOS, this app has been an invaluable resource. It has provided me with the information and support I need to manage my symptoms.'
        },
        {
          id: 4,
          img: Img4,
          name: 'Hannah Wilson',
          quote: 'I appreciate the holistic approach this app takes to PCOS management. It has helped me make positive lifestyle changes and feel more in control of my health.'
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
      arrows: false,
      centerPadding: '20px',
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            infinite: true,
            centerPadding: '20px'
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            infinite: true,
            centerPadding: '20px'
          }
        },
        {
          breakpoint: 0,
          settings: {
            slidesToShow: 1,
            infinite: true,
            centerPadding: '20px'
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
              <p className="text-muted mb-0 f-15">{item.quote}</p>
            </div>
            <div className="test-user-info">
              <div className="avatar-md mx-auto">
                <img src={item.img} alt="" className="img-fluid d-block rounded-circle testi-user-img" />
              </div>
              <h5 className="f-17 mt-3 mb-1">{item.name}</h5>
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
                  <h2 className="">What Our Users research has found </h2>
                  <p className="text-muted">Hear from people who have found support and empowerment in managing their PCOS with our app.</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div id="testi-clients" className="owl-carousel owl-theme testi-content">
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