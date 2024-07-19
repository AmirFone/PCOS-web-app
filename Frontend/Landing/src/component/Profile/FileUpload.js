import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Table, Badge, Alert, Progress, Row, Col } from 'reactstrap';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { FaFileUpload, FaTrash, FaDownload, FaFileAlt, FaFilePdf, FaFileImage, FaFileWord, FaFileExcel } from 'react-icons/fa';

function FileUpload({ profile, setProfile }) {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const { currentUser } = useAuth();

  const fileTypes = [
    { value: 'medical_report', label: 'Medical Report' },
    { value: 'lab_result', label: 'Lab Result' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'diet_plan', label: 'Diet Plan' },
    { value: 'exercise_routine', label: 'Exercise Routine' },
    { value: 'other', label: 'Other' }
  ];

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf': return <FaFilePdf />;
      case 'jpg':
      case 'jpeg':
      case 'png': return <FaFileImage />;
      case 'doc':
      case 'docx': return <FaFileWord />;
      case 'xls':
      case 'xlsx': return <FaFileExcel />;
      default: return <FaFileAlt />;
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file || !fileType) return;

    const storageRef = ref(storage, `files/${currentUser.uid}/${fileType}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploadProgress(0);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const newFile = {
          name: file.name,
          url: downloadURL,
          type: fileType,
          description: fileDescription,
          uploadDate: new Date().toISOString()
        };
        
        const updatedFiles = [...(profile.files || []), newFile];
        
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { files: updatedFiles });
        setProfile({ ...profile, files: updatedFiles });
        setFile(null);
        setFileType('');
        setFileDescription('');
        setUploadProgress(0);
      }
    );
  };

  const handleDeleteFile = async (fileToDelete) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      const storageRef = ref(storage, fileToDelete.url);
      await deleteObject(storageRef);

      const updatedFiles = profile.files.filter(file => file.url !== fileToDelete.url);
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { files: updatedFiles });
      setProfile({ ...profile, files: updatedFiles });
    }
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h5"><FaFileUpload className="mr-2" /> PCOS Document Manager</CardTitle>
        <Form onSubmit={handleFileUpload}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="fileUpload">Upload File</Label>
                <Input type="file" name="file" id="fileUpload" onChange={(e) => setFile(e.target.files[0])} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="fileType">Document Type</Label>
                <Input type="select" name="fileType" id="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)} required>
                  <option value="">Select type...</option>
                  {fileTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="fileDescription">Description (optional)</Label>
            <Input type="textarea" name="fileDescription" id="fileDescription" value={fileDescription} onChange={(e) => setFileDescription(e.target.value)} />
          </FormGroup>
          <Button color="primary" type="submit" disabled={!file || !fileType} block>
            Upload Document
          </Button>
        </Form>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <Progress value={uploadProgress} className="mt-3">
            {Math.round(uploadProgress)}%
          </Progress>
        )}
        {profile && profile.files && profile.files.length > 0 ? (
          <div className="mt-4">
            <h6>Your PCOS Documents</h6>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Upload Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profile.files.map((file, index) => (
                  <tr key={index}>
                    <td>
                      <Badge color="info">{fileTypes.find(t => t.value === file.type)?.label || 'Other'}</Badge>
                    </td>
                    <td>
                      {getFileIcon(file.name)} {file.name}
                    </td>
                    <td>{file.description || '-'}</td>
                    <td>{new Date(file.uploadDate).toLocaleDateString()}</td>
                    <td>
                      <Button color="link" href={file.url} target="_blank" rel="noopener noreferrer">
                        <FaDownload />
                      </Button>
                      <Button color="link" onClick={() => handleDeleteFile(file)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <Alert color="info" className="mt-3">
            You haven't uploaded any PCOS-related documents yet. Start by uploading your medical reports, lab results, or treatment plans.
          </Alert>
        )}
      </CardBody>
    </Card>
  );
}

export default FileUpload;