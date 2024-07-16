import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const SymptomJournal = ({ profile, setProfile }) => {
  const [symptom, setSymptom] = useState('');
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      symptom,
      severity,
      notes,
      date: new Date().toISOString()
    };

    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      symptomJournal: arrayUnion(newEntry)
    });

    setProfile({
      ...profile,
      symptomJournal: [...(profile.symptomJournal || []), newEntry]
    });

    setSymptom('');
    setSeverity(5);
    setNotes('');
  };

  const generateMonthlyReport = () => {
    if (profile.symptomJournal && profile.symptomJournal.length > 0) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlySymptoms = profile.symptomJournal.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
      });

      const symptomCounts = {};
      monthlySymptoms.forEach(entry => {
        symptomCounts[entry.symptom] = (symptomCounts[entry.symptom] || 0) + 1;
      });

      return Object.entries(symptomCounts).map(([symptom, count]) => (
        <p key={symptom}>{symptom}: {count} times</p>
      ));
    }
    return <p>No data for this month</p>;
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Symptom Journal</CardTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="symptom">Symptom</Label>
            <Input
              type="select"
              name="symptom"
              id="symptom"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              required
            >
              <option value="">Select a symptom</option>
              <option value="acne">Acne</option>
              <option value="hirsutism">Hirsutism</option>
              <option value="fatigue">Fatigue</option>
              <option value="weightGain">Weight Gain</option>
              <option value="hairLoss">Hair Loss</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="severity">Severity (1-10)</Label>
            <Input
              type="number"
              name="severity"
              id="severity"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="notes">Notes</Label>
            <Input
              type="textarea"
              name="notes"
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormGroup>
          <Button color="primary" type="submit">Log Symptom</Button>
        </Form>
        <div className="mt-3">
          <h6>Monthly Report</h6>
          {generateMonthlyReport()}
        </div>
        <Table className="mt-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Symptom</th>
              <th>Severity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {profile.symptomJournal && profile.symptomJournal.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.symptom}</td>
                <td>{entry.severity}</td>
                <td>{entry.notes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default SymptomJournal;