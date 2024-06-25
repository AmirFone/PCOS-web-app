import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';

function Profile() {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          // If the profile doesn't exist, create a new one
          const newProfile = { email: currentUser.email, files: [] };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
      };
      fetchProfile();
    }
  }, [currentUser]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `files/${currentUser.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    const updatedProfile = {
      ...profile,
      files: [...(profile.files || []), { name: file.name, url: downloadURL }]
    };
    
    await setDoc(doc(db, 'users', currentUser.uid), updatedProfile);
    setProfile(updatedProfile);
    setFile(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  if (!currentUser) return <Container><Row><Col><p>Please log in</p></Col></Row></Container>;

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Profile</h2>
          <p>Email: {currentUser.email}</p>
          <Form>
            <FormGroup>
              <Label for="fileUpload">Upload File</Label>
              <Input type="file" name="file" id="fileUpload" onChange={(e) => setFile(e.target.files[0])} />
            </FormGroup>
            <Button color="primary" onClick={handleFileUpload} disabled={!file}>
              Upload
            </Button>
          </Form>
          {profile && profile.files && (
            <div className="mt-4">
              <h4>Uploaded Files</h4>
              <ListGroup>
                {profile.files.map((file, index) => (
                  <ListGroupItem key={index}>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          )}
          <Button color="danger" className="mt-4" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;