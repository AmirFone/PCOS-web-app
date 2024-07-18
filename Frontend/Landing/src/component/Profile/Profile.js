// src/component/Profile/Profile.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Container, Row, Col, Button, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import classnames from 'classnames';
import UserInfo from './UserInfo';
import WeightTracker from './WeightTracker';
import HormoneTracker from './HormoneTracker';
import FileUpload from './FileUpload';
import Dashboard from './Dashboard';
import AIChat from './AIChat';
import MenstrualCycleTracker from './MenstrualCycleTracker';
import SymptomJournal from './SymptomJournal';
import MedicationTracker from './MedicationTracker';
import SymptomTracker from './SymptomTracker';
import { FaRobot, FaWeight, FaVial, FaCalendar, FaNotesMedical, FaPills, FaFile, FaChartLine } from 'react-icons/fa';

function Profile() {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [quickWeight, setQuickWeight] = useState('');
  const [quickSymptom, setQuickSymptom] = useState('');

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        setLoading(true);
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
            files: [],
            menstrualCycles: [],
            symptomJournal: [],
            medications: [],
            symptomEntries: []
          };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
        setLoading(false);
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

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const setProfileAndUpdateFirestore = async (newProfile) => {
    setProfile(newProfile);
    const userRef = doc(db, 'users', currentUser.uid);
    await setDoc(userRef, newProfile);
  };

  const handleQuickWeightAdd = async (e) => {
    e.preventDefault();
    if (!quickWeight || !profile) return;

    const newEntry = { weight: parseFloat(quickWeight), date: new Date().toISOString() };
    const updatedProfile = {
      ...profile,
      weightEntries: [...(profile.weightEntries || []), newEntry]
    };

    await setProfileAndUpdateFirestore(updatedProfile);
    setQuickWeight('');
  };

  const handleQuickSymptomAdd = async (e) => {
    e.preventDefault();
    if (!quickSymptom || !profile) return;

    const newEntry = { symptom: quickSymptom, date: new Date().toISOString() };
    const updatedProfile = {
      ...profile,
      symptomJournal: [...(profile.symptomJournal || []), newEntry]
    };

    await setProfileAndUpdateFirestore(updatedProfile);
    setQuickSymptom('');
  };

  if (!currentUser) return <Container><Row><Col><p>Please log in</p></Col></Row></Container>;
  if (loading) return <Container><Row><Col><Spinner color="primary" /></Col></Row></Container>;

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={3}>
          <UserInfo user={currentUser} profile={profile} />
          <Card className="mt-3">
            <CardBody>
              <CardTitle tag="h5">Quick Add</CardTitle>
              <Form onSubmit={handleQuickWeightAdd}>
                <FormGroup>
                  <Label for="quickWeight">Weight (kg)</Label>
                  <Input
                    type="number"
                    name="quickWeight"
                    id="quickWeight"
                    value={quickWeight}
                    onChange={(e) => setQuickWeight(e.target.value)}
                    placeholder="Enter weight"
                  />
                </FormGroup>
                <Button color="primary" type="submit">Add Weight</Button>
              </Form>
              <Form onSubmit={handleQuickSymptomAdd} className="mt-3">
                <FormGroup>
                  <Label for="quickSymptom">Symptom</Label>
                  <Input
                    type="text"
                    name="quickSymptom"
                    id="quickSymptom"
                    value={quickSymptom}
                    onChange={(e) => setQuickSymptom(e.target.value)}
                    placeholder="Enter symptom"
                  />
                </FormGroup>
                <Button color="primary" type="submit">Add Symptom</Button>
              </Form>
            </CardBody>
          </Card>
          <Button color="danger" className="mt-3 w-100" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
        <Col md={9}>
          <Dashboard profile={profile} />
          <Nav tabs className="mt-4">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                <FaWeight /> Weight
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                <FaVial /> Hormones
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggle('3'); }}
              >
                <FaCalendar /> Menstrual Cycle
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '4' })}
                onClick={() => { toggle('4'); }}
              >
                <FaNotesMedical /> Symptoms
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '5' })}
                onClick={() => { toggle('5'); }}
              >
                <FaPills /> Medications
              </NavLink>
            </NavItem>
	    <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '6' })}
                onClick={() => { toggle('6'); }}
              >
                <FaChartLine /> Symptom Tracker
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '7' })}
                onClick={() => { toggle('7'); }}
              >
                <FaFile /> Files
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <WeightTracker profile={profile} setProfile={setProfileAndUpdateFirestore} />
            </TabPane>
            <TabPane tabId="2">
              <HormoneTracker profile={profile} setProfile={setProfileAndUpdateFirestore} />
            </TabPane>
            <TabPane tabId="3">
              <MenstrualCycleTracker profile={profile} setProfile={setProfileAndUpdateFirestore} />
            </TabPane>
            <TabPane tabId="4">
              <SymptomJournal profile={profile} setProfile={setProfileAndUpdateFirestore} />
            </TabPane>
            <TabPane tabId="5">
              <MedicationTracker profile={profile} setProfile={setProfileAndUpdateFirestore} />
            </TabPane>
            <TabPane tabId="6">
              <SymptomTracker profile={profile} setProfile={setProfileAndUpdateFirestore} />
            </TabPane>
	    <TabPane tabId="7">
              <FileUpload profile={profile} setProfile={setProfileAndUpdateFirestore} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      <Button 
        color="info" 
        style={{position: 'fixed', bottom: '20px', right: '20px', zIndex: 1001}}
        onClick={toggleChat}
      >
        <FaRobot /> Chat Assistant
      </Button>
      <AIChat profile={profile} isOpen={isChatOpen} toggle={toggleChat} />
    </Container>
  );
}

export default Profile;