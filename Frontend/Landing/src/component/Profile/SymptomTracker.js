import React, { useState } from 'react';
import { Button, Card, CardBody, CardTitle, Row, Col, Label, Input } from 'reactstrap';

const symptoms = ['Acne', 'Mood', 'Pain', 'Fatigue', 'Bloating'];

const SymptomTracker = ({ profile, setProfile }) => {
  const [symptomRatings, setSymptomRatings] = useState({});

  const handleSliderChange = (symptom, value) => {
    setSymptomRatings(prev => ({ ...prev, [symptom]: value }));
  };

  const handleSubmit = async () => {
    const newEntry = {
      date: new Date().toISOString(),
      ...symptomRatings
    };

    const updatedProfile = {
      ...profile,
      symptomEntries: [...(profile.symptomEntries || []), newEntry]
    };

    setProfile(updatedProfile);
    setSymptomRatings({});
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Daily Symptom Tracker</CardTitle>
        <Row>
          <Col md={12}>
            {symptoms.map(symptom => (
              <div key={symptom} className="mb-3">
                <Label>{symptom}: {symptomRatings[symptom] || 0}</Label>
                <Input
                  type="range"
                  className="form-range"
                  min={0}
                  max={10}
                  step={1}
                  value={symptomRatings[symptom] || 0}
                  onChange={(e) => handleSliderChange(symptom, parseInt(e.target.value))}
                />
              </div>
            ))}
            <Button color="primary" onClick={handleSubmit}>Log Symptoms</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SymptomTracker;