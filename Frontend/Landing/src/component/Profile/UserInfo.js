import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

function UserInfo({ user, profile }) {
  return (
    <Card>
      <CardBody>
        <div className="text-center mb-3">
          <img src={user.photoURL} alt="Profile" className="rounded-circle" width="100" height="100" />
        </div>
        <CardTitle tag="h5">{user.displayName}</CardTitle>
        <CardText>Email: {user.email}</CardText>
        {profile && profile.age && <CardText>Age: {profile.age}</CardText>}
        {profile && profile.diagnosisDate && <CardText>Diagnosis Date: {profile.diagnosisDate}</CardText>}
      </CardBody>
    </Card>
  );
}

export default UserInfo;