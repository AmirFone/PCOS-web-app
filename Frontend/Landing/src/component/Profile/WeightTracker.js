import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, Progress, Row, Col } from 'reactstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Line } from 'react-chartjs-2';
import { FaPlus, FaMinus } from 'react-icons/fa';

function WeightTracker({ profile, setProfile }) {
  const [weight, setWeight] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight) return;
    const newEntry = { weight: parseFloat(weight), date: new Date().toISOString() };
    const updatedEntries = [...(profile.weightEntries || []), newEntry].sort((a, b) => new Date(b.date) - new Date(a.date));
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, { weightEntries: updatedEntries });
    setProfile({ ...profile, weightEntries: updatedEntries });
    setWeight('');
  };

  const getWeightChange = () => {
    if (profile.weightEntries && profile.weightEntries.length > 1) {
      const latest = profile.weightEntries[0].weight;
      const oldest = profile.weightEntries[profile.weightEntries.length - 1].weight;
      return (latest - oldest).toFixed(1);
    }
    return 0;
  };

  const chartData = {
    labels: profile.weightEntries ? profile.weightEntries.slice(-7).map(entry => new Date(entry.date).toLocaleDateString()) : [],
    datasets: [
      {
        label: 'Weight (lb)',
        data: profile.weightEntries ? profile.weightEntries.slice(-7).map(entry => entry.weight) : [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h5">Weight Tracker</CardTitle>
        <Row className="align-items-center mb-4">
          <Col xs="3" sm="4" md="3">
            <Form onSubmit={handleSubmit} className="d-flex align-items-center">
              <Input
                type="number"
                name="weight"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight"
                className="mr-2"
              />
              <Button color="primary" type="submit" className="ml-2">
                <FaPlus />
              </Button>
            </Form>
          </Col>
          <Col xs="6" sm="8" md="9">
            <div className="text-right">
              <h6>Last 7 Days Change</h6>
              <h3 className={getWeightChange() < 0 ? "text-success" : "text-danger"}>
                {getWeightChange() < 0 ? <FaMinus /> : <FaPlus />} {Math.abs(getWeightChange())} lb
              </h3>
            </div>
          </Col>
        </Row>

        <ListGroup>
          {profile && profile.weightEntries && profile.weightEntries.slice(0, 5).map((entry, index) => (
            <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
              <span>{new Date(entry.date).toLocaleDateString()}</span>
              <span className="font-weight-bold">{entry.weight} lb</span>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
}

export default WeightTracker;