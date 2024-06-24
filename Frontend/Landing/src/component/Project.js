import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FeatherIcon from "feather-icons-react";

const features = [
  {
    icon: "calendar",
    title: "Symptom Tracking",
    description: "Log and monitor your PCOS-related symptoms to identify patterns and trends."
  },
  {
    icon: "smartphone",
    title: "Patient-Physician Communication",
    description: "Share real-time health updates with your healthcare provider for better care."
  },
  {
    icon: "users",
    title: "Community Support",
    description: "Connect with others who understand the challenges of living with PCOS."
  },
  {
    icon: "activity",
    title: "Personalized Recommendations",
    description: "Receive tailored health tips and lifestyle suggestions based on your data."
  },
  {
    icon: "book",
    title: "PCOS Education",
    description: "Access a curated library of articles and resources about PCOS management."
  },
  {
    icon: "map-pin",
    title: "Specialist Finder",
    description: "Locate PCOS specialists in your area using our zip code search feature."
  }
];

const sampleData = [
  { name: 'Week 1', symptoms: 4, weight: 150 },
  { name: 'Week 2', symptoms: 3, weight: 149 },
  { name: 'Week 3', symptoms: 2, weight: 148 },
  { name: 'Week 4', symptoms: 5, weight: 151 },
  { name: 'Week 5', symptoms: 1, weight: 147 },
];

const Project = () => {
  return (
    <section className="section bg-light" id="project">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center mb-5">
              <h2 className="mb-3">Empowering PCOS Management</h2>
              <p className="text-muted">
                Our companion app helps individuals with PCOS take control of their health journey through personalized tracking, education, and community support.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">Data Visualization</h4>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="symptoms" stroke="#8884d8" name="Symptoms" />
                      <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#82ca9d" name="Weight (lbs)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          {features.map((feature, index) => (
            <Col lg={4} md={6} key={index}>
              <Card className="mb-4">
                <CardBody>
                  <div className="text-primary mb-4">
                    <FeatherIcon icon={feature.icon} size={24} />
                  </div>
                  <h4 className="card-title mb-3">{feature.title}</h4>
                  <p className="card-text text-muted">{feature.description}</p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="justify-content-center mt-5">
          <Col lg={6} className="text-center">
            <p className="mb-4">Ready to take control of your PCOS journey?</p>
            <Link to="#" className="btn btn-primary">
              Get Started
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Project;