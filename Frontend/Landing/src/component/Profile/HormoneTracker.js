import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

function HormoneTracker({ profile, setProfile }) {
  const [hormoneLevel, setHormoneLevel] = useState('');
  const [hormoneType, setHormoneType] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hormoneLevel || !hormoneType) return;

    const newEntry = { type: hormoneType, level: parseFloat(hormoneLevel), date: new Date().toISOString() };
    const updatedEntries = [...(profile.hormoneEntries || []), newEntry];

    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, { hormoneEntries: updatedEntries });

    setProfile({ ...profile, hormoneEntries: updatedEntries });
    setHormoneLevel('');
    setHormoneType('');
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Hormone Tracker</CardTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="hormoneType">Hormone Type</Label>
            <Input
              type="select"
              name="hormoneType"
              id="hormoneType"
              value={hormoneType}
              onChange={(e) => setHormoneType(e.target.value)}
            >
              <option value="">Select hormone</option>
              <option value="Estrogen">Estrogen</option>
              <option value="Progesterone">Progesterone</option>
              <option value="Testosterone">Testosterone</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="hormoneLevel">Hormone Level</Label>
            <Input
              type="number"
              name="hormoneLevel"
              id="hormoneLevel"
              value={hormoneLevel}
              onChange={(e) => setHormoneLevel(e.target.value)}
              placeholder="Enter hormone level"
            />
          </FormGroup>
          <Button color="primary" type="submit">Add Entry</Button>
        </Form>
        <ListGroup className="mt-3">
          {profile && profile.hormoneEntries && profile.hormoneEntries.slice(-5).reverse().map((entry, index) => (
            <ListGroupItem key={index}>
              {new Date(entry.date).toLocaleDateString()}: {entry.type} - {entry.level}
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
}

export default HormoneTracker;