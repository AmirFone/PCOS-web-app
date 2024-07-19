import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, Row, Col, Badge } from 'reactstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { FaInfoCircle } from 'react-icons/fa';

function HormoneTracker({ profile, setProfile }) {
  const [hormoneLevel, setHormoneLevel] = useState('');
  const [hormoneType, setHormoneType] = useState('');
  const { currentUser } = useAuth();

  const hormoneTypes = [
    { value: 'Estradiol', unit: 'pg/mL', normalRange: '30-400' },
    { value: 'Progesterone', unit: 'ng/mL', normalRange: '0.1-25' },
    { value: 'Testosterone', unit: 'ng/dL', normalRange: '15-70' },
    { value: 'FSH', unit: 'mIU/mL', normalRange: '4-13' },
    { value: 'LH', unit: 'mIU/mL', normalRange: '1-25' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hormoneLevel || !hormoneType) return;
    const newEntry = { type: hormoneType, level: parseFloat(hormoneLevel), date: new Date().toISOString() };
    const updatedEntries = [...(profile.hormoneEntries || []), newEntry].sort((a, b) => new Date(b.date) - new Date(a.date));
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, { hormoneEntries: updatedEntries });
    setProfile({ ...profile, hormoneEntries: updatedEntries });
    setHormoneLevel('');
    setHormoneType('');
  };

  const getHormoneInfo = (type) => {
    return hormoneTypes.find(h => h.value === type) || {};
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h5">Hormone Tracker</CardTitle>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="hormoneType">Hormone Type</Label>
                <Input
                  type="select"
                  name="hormoneType"
                  id="hormoneType"
                  value={hormoneType}
                  onChange={(e) => setHormoneType(e.target.value)}
                  required
                >
                  <option value="">Select hormone</option>
                  {hormoneTypes.map(hormone => (
                    <option key={hormone.value} value={hormone.value}>{hormone.value}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="hormoneLevel">
                  Hormone Level {hormoneType && `(${getHormoneInfo(hormoneType).unit})`}
                </Label>
                <Input
                  type="number"
                  name="hormoneLevel"
                  id="hormoneLevel"
                  value={hormoneLevel}
                  onChange={(e) => setHormoneLevel(e.target.value)}
                  placeholder="Enter hormone level"
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" type="submit" block>Add Entry</Button>
        </Form>
        {hormoneType && (
          <div className="mt-3">
            <FaInfoCircle /> Normal range for {hormoneType}: {getHormoneInfo(hormoneType).normalRange} {getHormoneInfo(hormoneType).unit}
          </div>
        )}
        <ListGroup className="mt-4">
          {profile && profile.hormoneEntries && profile.hormoneEntries.slice(0, 5).map((entry, index) => (
            <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{entry.type}</strong>: {entry.level} {getHormoneInfo(entry.type).unit}
                <br />
                <small className="text-muted">{new Date(entry.date).toLocaleDateString()}</small>
              </div>
              <Badge color={entry.level >= parseFloat(getHormoneInfo(entry.type).normalRange.split('-')[0]) &&
                          entry.level <= parseFloat(getHormoneInfo(entry.type).normalRange.split('-')[1])
                          ? "success" : "warning"} pill>
                {entry.level >= parseFloat(getHormoneInfo(entry.type).normalRange.split('-')[0]) &&
                 entry.level <= parseFloat(getHormoneInfo(entry.type).normalRange.split('-')[1])
                 ? "Normal" : "Out of Range"}
              </Badge>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
}

export default HormoneTracker;