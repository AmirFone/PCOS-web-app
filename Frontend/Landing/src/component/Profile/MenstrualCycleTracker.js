import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const MenstrualCycleTracker = ({ profile, setProfile }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [symptoms, setSymptoms] = useState({
    cramps: false,
    moodSwings: false,
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
      menstrualCycles: [...(profile.menstrualCycles || []), newEntry]
    });

    setStartDate('');
    setEndDate('');
    setSymptoms({
      cramps: false,
      moodSwings: false,
      flowIntensity: 'medium'
    });
  };

  const predictNextCycle = () => {
    if (profile.menstrualCycles && profile.menstrualCycles.length > 0) {
      const lastCycle = profile.menstrualCycles[profile.menstrualCycles.length - 1];
      const lastStartDate = new Date(lastCycle.startDate);
      const predictedDate = new Date(lastStartDate.setDate(lastStartDate.getDate() + 28));
      return predictedDate.toISOString().split('T')[0];
    }
    return 'Not enough data';
  };

  const isIrregular = () => {
    if (profile.menstrualCycles && profile.menstrualCycles.length > 1) {
      const lastTwoCycles = profile.menstrualCycles.slice(-2);
      const daysBetween = (new Date(lastTwoCycles[1].startDate) - new Date(lastTwoCycles[0].startDate)) / (1000 * 3600 * 24);
      return Math.abs(daysBetween - 28) > 7;
    }
    return false;
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Menstrual Cycle Tracker</CardTitle>
        <Form onSubmit={handleSubmit}>
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
          <Button color="primary" type="submit">Log Cycle</Button>
        </Form>
        <div className="mt-3">
          <p>Predicted Next Cycle: {predictNextCycle()}</p>
          {isIrregular() && (
            <p className="text-danger">Your cycles appear to be irregular. Consider consulting your doctor.</p>
          )}
        </div>
        <Table className="mt-3">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Symptoms</th>
            </tr>
          </thead>
          <tbody>
            {profile.menstrualCycles && profile.menstrualCycles.map((cycle, index) => (
              <tr key={index}>
                <td>{new Date(cycle.startDate).toLocaleDateString()}</td>
                <td>{new Date(cycle.endDate).toLocaleDateString()}</td>
                <td>
                  {cycle.symptoms.cramps && 'Cramps '}
                  {cycle.symptoms.moodSwings && 'Mood Swings '}
                  {cycle.symptoms.flowIntensity}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default MenstrualCycleTracker;