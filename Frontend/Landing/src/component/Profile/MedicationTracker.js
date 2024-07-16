import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

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
      medications: [...(profile.medications || []), newMedication]
    });

    setMedication('');
    setDosage('');
    setFrequency('');
    setStartDate('');
    setEffectiveness(5);
    setSideEffects('');
  };

  const generateReport = () => {
    if (profile.medications && profile.medications.length > 0) {
      return profile.medications.map((med, index) => (
        <div key={index}>
          <h6>{med.medication}</h6>
          <p>Dosage: {med.dosage}</p>
          <p>Frequency: {med.frequency}</p>
          <p>Start Date: {new Date(med.startDate).toLocaleDateString()}</p>
          <p>Effectiveness: {med.effectiveness}/10</p>
          <p>Side Effects: {med.sideEffects}</p>
        </div>
      ));
    }
    return <p>No medications logged</p>;
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
    <Card>
      <CardBody>
        <CardTitle tag="h5">Medication and Supplement Tracker</CardTitle>
        <Form onSubmit={handleSubmit}>
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
          <FormGroup>
            <Label for="frequency">Frequency</Label>
            <Input
              type="text"
              name="frequency"
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
            />
          </FormGroup>
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
            <Label for="effectiveness">Effectiveness (1-10)</Label>
            <Input
              type="number"
              name="effectiveness"
              id="effectiveness"
              min="1"
              max="10"
              value={effectiveness}
              onChange={(e) => setEffectiveness(parseInt(e.target.value))}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="sideEffects">Side Effects</Label>
            <Input
              type="textarea"
              name="sideEffects"
              id="sideEffects"
              value={sideEffects}
              onChange={(e) => setSideEffects(e.target.value)}
            />
          </FormGroup>
          <Button color="primary" type="submit">Log Medication</Button>
        </Form>
        <div className="mt-3">
          <h6>Medication Report</h6>
          {generateReport()}
        </div>
        <Table className="mt-3">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Start Date</th>
              <th>Effectiveness</th>
            </tr>
          </thead>
          <tbody>
            {profile.medications && profile.medications.map((med, index) => (
              <tr key={index}>
                <td>{med.medication}</td>
                <td>{med.dosage}</td>
                <td>{med.frequency}</td>
                <td>{new Date(med.startDate).toLocaleDateString()}</td>
                <td>{med.effectiveness}/10</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default MedicationTracker;