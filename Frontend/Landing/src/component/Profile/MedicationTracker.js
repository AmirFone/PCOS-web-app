import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Table, Row, Col, Badge, Alert, Progress } from 'reactstrap';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { FaPills, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const MedicationTracker = ({ profile, setProfile }) => {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [effectiveness, setEffectiveness] = useState(5);
  const [sideEffects, setSideEffects] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMedication = {
      medication,
      dosage,
      frequency,
      startDate,
      effectiveness,
      sideEffects,
      date: new Date().toISOString()
    };

    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      medications: arrayUnion(newMedication)
    });

    setProfile({
      ...profile,
      medications: [...(profile.medications || []), newMedication].sort((a, b) => new Date(b.date) - new Date(a.date))
    });

    resetForm();
  };

  const resetForm = () => {
    setMedication('');
    setDosage('');
    setFrequency('');
    setStartDate('');
    setEffectiveness(5);
    setSideEffects('');
  };

  const generateReport = () => {
    if (profile.medications && profile.medications.length > 0) {
      return profile.medications.slice(0, 3).map((med, index) => (
        <Card key={index} className="mb-2">
          <CardBody>
            <h6>{med.medication}</h6>
            <p className="mb-1"><strong>Dosage:</strong> {med.dosage}</p>
            <p className="mb-1"><strong>Frequency:</strong> {med.frequency}</p>
            <p className="mb-1"><strong>Start Date:</strong> {new Date(med.startDate).toLocaleDateString()}</p>
            <p className="mb-1"><strong>Effectiveness:</strong></p>
            <Progress value={med.effectiveness * 10} color={med.effectiveness >= 7 ? "success" : med.effectiveness >= 4 ? "warning" : "danger"}>{med.effectiveness}/10</Progress>
            <p className="mb-1 mt-2"><strong>Side Effects:</strong> {med.sideEffects || 'None reported'}</p>
          </CardBody>
        </Card>
      ));
    }
    return <Alert color="info">No medications logged</Alert>;
  };

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      profile.medications && profile.medications.forEach(med => {
        const startDate = new Date(med.startDate);
        if (startDate <= now) {
          // This is a simple daily reminder. You might want to implement more complex logic based on frequency
          alert(`Time to take ${med.medication}!`);
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [profile.medications]);

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h5"><FaPills className="mr-2" /> Medication and Supplement Tracker</CardTitle>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="medication">Medication/Supplement Name</Label>
                <Input
                  type="text"
                  name="medication"
                  id="medication"
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="dosage">Dosage</Label>
                <Input
                  type="text"
                  name="dosage"
                  id="dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="frequency">Frequency</Label>
                <Input
                  type="select"
                  name="frequency"
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="As needed">As needed</option>
                  <option value="Weekly">Weekly</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="effectiveness">Effectiveness (1-10)</Label>
                <Input
                  type="range"
                  name="effectiveness"
                  id="effectiveness"
                  min="1"
                  max="10"
                  value={effectiveness}
                  onChange={(e) => setEffectiveness(parseInt(e.target.value))}
                  required
                />
                <div className="text-center">{effectiveness}</div>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="sideEffects">Side Effects</Label>
                <Input
                  type="textarea"
                  name="sideEffects"
                  id="sideEffects"
                  value={sideEffects}
                  onChange={(e) => setSideEffects(e.target.value)}
                  rows="3"
                />
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" type="submit" block>Log Medication</Button>
        </Form>
        <div className="mt-4">
          <h6>Recent Medications</h6>
          {generateReport()}
        </div>
        <Table responsive className="mt-4">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Start Date</th>
              <th>Effectiveness</th>
              <th>Side Effects</th>
            </tr>
          </thead>
          <tbody>
            {profile.medications && profile.medications.map((med, index) => (
              <tr key={index}>
                <td>{med.medication}</td>
                <td>{med.dosage}</td>
                <td>{med.frequency}</td>
                <td>{new Date(med.startDate).toLocaleDateString()}</td>
                <td>
                  <Badge color={med.effectiveness >= 7 ? "success" : med.effectiveness >= 4 ? "warning" : "danger"}>
                    {med.effectiveness}/10
                  </Badge>
                </td>
                <td>{med.sideEffects || 'None reported'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Alert color="warning" className="mt-3">
          <FaExclamationTriangle className="mr-2" /> Always consult with your healthcare provider before starting or changing any medication regimen.
        </Alert>
      </CardBody>
    </Card>
  );
};

export default MedicationTracker;