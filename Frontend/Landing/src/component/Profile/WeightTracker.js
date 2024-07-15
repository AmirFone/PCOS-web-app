import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

function WeightTracker({ profile, setProfile }) {
  const [weight, setWeight] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight) return;

    const newEntry = { weight: parseFloat(weight), date: new Date().toISOString() };
    const updatedEntries = [...(profile.weightEntries || []), newEntry];

    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, { weightEntries: updatedEntries });

    setProfile({ ...profile, weightEntries: updatedEntries });
    setWeight('');
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Weight Tracker</CardTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="weight">Weight (kg)</Label>
            <Input
              type="number"
              name="weight"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
            />
          </FormGroup>
          <Button color="primary" type="submit">Add Entry</Button>
        </Form>
        <ListGroup className="mt-3">
          {profile && profile.weightEntries && profile.weightEntries.slice(-5).reverse().map((entry, index) => (
            <ListGroupItem key={index}>
              {new Date(entry.date).toLocaleDateString()}: {entry.weight} kg
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
}

export default WeightTracker;