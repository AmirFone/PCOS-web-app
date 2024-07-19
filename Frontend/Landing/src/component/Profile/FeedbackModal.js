import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const FeedbackModal = ({ isOpen, toggle }) => {
  const [feedback, setFeedback] = useState('');
  const [improvement, setImprovement] = useState('');
  const [missingFeature, setMissingFeature] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'feedback'), {
        userId: currentUser.uid,
        feedback,
        improvement,
        missingFeature,
        phoneNumber,
        timestamp: serverTimestamp()
      });
      toggle();
      alert('Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>We Value Your Feedback</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="feedback">What features do you like?</Label>
            <Input
              type="textarea"
              name="feedback"
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="improvement">What changes would you like to see?</Label>
            <Input
              type="textarea"
              name="improvement"
              id="improvement"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="missingFeature">What feature is missing?</Label>
            <Input
              type="textarea"
              name="missingFeature"
              id="missingFeature"
              value={missingFeature}
              onChange={(e) => setMissingFeature(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number (optional)</Label>
            <Input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="For follow-up research (optional)"
            />
          </FormGroup>
          <Button color="primary" type="submit">Submit Feedback</Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default FeedbackModal;