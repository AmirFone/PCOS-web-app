import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Table, Row, Col, Badge, Alert } from 'reactstrap';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

const MenstrualCycleTracker = ({ profile, setProfile }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [symptoms, setSymptoms] = useState({
    cramps: false,
    moodSwings: false,
    headache: false,
    bloating: false,
    flowIntensity: 'medium'
  });
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      startDate,
      endDate,
      symptoms,
      date: new Date().toISOString()
    };

    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      menstrualCycles: arrayUnion(newEntry)
    });

    setProfile({
      ...profile,
      menstrualCycles: [...(profile.menstrualCycles || []), newEntry].sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    });

    resetForm();
  };

  const resetForm = () => {
    setStartDate('');
    setEndDate('');
    setSymptoms({
      cramps: false,
      moodSwings: false,
      headache: false,
      bloating: false,
      flowIntensity: 'medium'
    });
  };

  const predictNextCycle = () => {
    if (profile.menstrualCycles && profile.menstrualCycles.length > 0) {
      const lastCycle = profile.menstrualCycles[0];
      const lastStartDate = new Date(lastCycle.startDate);
      const predictedDate = new Date(lastStartDate.setDate(lastStartDate.getDate() + 28));
      return predictedDate.toISOString().split('T')[0];
    }
    return 'Not enough data';
  };

  const isIrregular = () => {
    if (profile.menstrualCycles && profile.menstrualCycles.length > 1) {
      const lastTwoCycles = profile.menstrualCycles.slice(0, 2);
      const daysBetween = (new Date(lastTwoCycles[0].startDate) - new Date(lastTwoCycles[1].startDate)) / (1000 * 3600 * 24);
      return Math.abs(daysBetween - 28) > 7;
    }
    return false;
  };

  const getAverageCycleLength = () => {
    if (profile.menstrualCycles && profile.menstrualCycles.length > 1) {
      const cycleLengths = profile.menstrualCycles.slice(0, -1).map((cycle, index) => {
        const nextCycle = profile.menstrualCycles[index + 1];
        return (new Date(cycle.startDate) - new Date(nextCycle.startDate)) / (1000 * 3600 * 24);
      });
      const averageLength = cycleLengths.reduce((sum, length) => sum + length, 0) / cycleLengths.length;
      return Math.round(averageLength);
    }
    return 'Not enough data';
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h5">Menstrual Cycle Tracker</CardTitle>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
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
            <Col md={6}>
              <FormGroup>
                <Label for="endDate">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={6} sm={3}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={symptoms.cramps}
                    onChange={(e) => setSymptoms({...symptoms, cramps: e.target.checked})}
                  />{' '}
                  Cramps
                </Label>
              </FormGroup>
            </Col>
            <Col xs={6} sm={3}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={symptoms.moodSwings}
                    onChange={(e) => setSymptoms({...symptoms, moodSwings: e.target.checked})}
                  />{' '}
                  Mood Swings
                </Label>
              </FormGroup>
            </Col>
            <Col xs={6} sm={3}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={symptoms.headache}
                    onChange={(e) => setSymptoms({...symptoms, headache: e.target.checked})}
                  />{' '}
                  Headache
                </Label>
              </FormGroup>
            </Col>
            <Col xs={6} sm={3}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={symptoms.bloating}
                    onChange={(e) => setSymptoms({...symptoms, bloating: e.target.checked})}
                  />{' '}
                  Bloating
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="flowIntensity">Flow Intensity</Label>
            <Input
              type="select"
              name="flowIntensity"
              id="flowIntensity"
              value={symptoms.flowIntensity}
              onChange={(e) => setSymptoms({...symptoms, flowIntensity: e.target.value})}
            >
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="heavy">Heavy</option>
            </Input>
          </FormGroup>
          <Button color="primary" type="submit" block>Log Cycle</Button>
        </Form>
        <Alert color="info" className="mt-4">
          <FaCalendarAlt className="mr-2" /> Predicted Next Cycle: {predictNextCycle()}
        </Alert>
        {isIrregular() && (
          <Alert color="warning" className="mt-2">
            <FaExclamationTriangle className="mr-2" /> Your cycles appear to be irregular. Consider consulting your doctor.
          </Alert>
        )}
        <div className="mt-3">
          <h6>Cycle Statistics:</h6>
          <p>Average Cycle Length: {getAverageCycleLength()} days</p>
        </div>
        <Table responsive className="mt-4">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration</th>
              <th>Symptoms</th>
              <th>Flow</th>
            </tr>
          </thead>
          <tbody>
            {profile.menstrualCycles && profile.menstrualCycles.slice(0, 5).map((cycle, index) => (
              <tr key={index}>
                <td>{new Date(cycle.startDate).toLocaleDateString()}</td>
                <td>{new Date(cycle.endDate).toLocaleDateString()}</td>
                <td>{Math.round((new Date(cycle.endDate) - new Date(cycle.startDate)) / (1000 * 3600 * 24))} days</td>
                <td>
                  {cycle.symptoms.cramps && <Badge color="secondary" className="mr-1">Cramps</Badge>}
                  {cycle.symptoms.moodSwings && <Badge color="secondary" className="mr-1">Mood Swings</Badge>}
                  {cycle.symptoms.headache && <Badge color="secondary" className="mr-1">Headache</Badge>}
                  {cycle.symptoms.bloating && <Badge color="secondary" className="mr-1">Bloating</Badge>}
                </td>
                <td><Badge color={cycle.symptoms.flowIntensity === 'heavy' ? 'danger' : cycle.symptoms.flowIntensity === 'medium' ? 'warning' : 'success'}>{cycle.symptoms.flowIntensity}</Badge></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default MenstrualCycleTracker;