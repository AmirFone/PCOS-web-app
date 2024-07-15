import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

function FileUpload({ profile, setProfile }) {
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const storageRef = ref(storage, `files/${currentUser.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    const updatedFiles = [...(profile.files || []), { name: file.name, url: downloadURL }];
    
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, { files: updatedFiles });

    setProfile({ ...profile, files: updatedFiles });
    setFile(null);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">File Upload</CardTitle>
        <Form onSubmit={handleFileUpload}>
          <FormGroup>
            <Label for="fileUpload">Upload File</Label>
            <Input type="file" name="file" id="fileUpload" onChange={(e) => setFile(e.target.files[0])} />
          </FormGroup>
          <Button color="primary" type="submit" disabled={!file}>
            Upload
          </Button>
        </Form>
        {profile && profile.files && (
          <div className="mt-3">
            <h6>Uploaded Files</h6>
            <ListGroup>
              {profile.files.map((file, index) => (
                <ListGroupItem key={index}>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default FileUpload;