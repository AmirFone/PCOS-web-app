import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Container, Row, Col, Button } from 'reactstrap';
import UserInfo from './UserInfo';
import WeightTracker from './WeightTracker';
import HormoneTracker from './HormoneTracker';
import FileUpload from './FileUpload';
import Dashboard from './Dashboard';

function Profile() {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          const newProfile = {
            email: currentUser.email,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
            weightEntries: [],
            hormoneEntries: [],
            files: []
          };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
      };
      fetchProfile();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  if (!currentUser) return <Container><Row><Col><p>Please log in</p></Col></Row></Container>;

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={3}>
          <UserInfo user={currentUser} profile={profile} />
          <Button color="danger" className="mt-3 w-100" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
        <Col md={9}>
          <Dashboard profile={profile} />
          <Row className="mt-4">
            <Col md={6}>
              <WeightTracker profile={profile} setProfile={setProfile} />
            </Col>
            <Col md={6}>
              <HormoneTracker profile={profile} setProfile={setProfile} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <FileUpload profile={profile} setProfile={setProfile} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;