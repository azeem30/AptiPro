import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Adjust this based on your layout */
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto; /* This will center the container horizontally */
`;

const Title = styled.h1`
  color: #333;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: 1px solid #4caf50;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
`;

const FileNameDisplay = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;

const GenerateButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ReadOnlyBox = styled.textarea`
  width: 80%; /* Adjust as per your preference */
  height: 150px; /* Adjust as per your preference */
  margin-bottom: 15px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const Space = styled.div`
  margin-bottom: 15px;
`;

const FileUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContents, setFileContents] = useState('');
  const [fileError, setFileError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;

    if (file) {
      // Check if the file type is PDF or TXT
      const allowedTypes = ['application/pdf', 'text/plain'];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setFileError(''); // Clear any previous error
      } else {
        setFileError('Please upload a PDF or TXT file.');
        // Optionally, you can clear the selected file
        // setSelectedFile(null);
      }
    }
  };

  const handleFileInputClick = () => {
    document.getElementById('fileInput').value = null;
  };

  const handleGenerateClick = () => {
    console.log('File:', selectedFile);
    // Add your logic to perform the actual upload and generation

    // Simulating file contents, replace this with actual logic
    const generatedContents = `Generated contents for ${selectedFile ? selectedFile.name : ''}`;
    setFileContents(generatedContents);
  };

  return (
    <Container>
      <Title>File Upload</Title>
      <FileInput
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        onClick={handleFileInputClick}
      />
      <FileInputLabel htmlFor="fileInput">Choose File</FileInputLabel>
      {selectedFile && <FileNameDisplay>{selectedFile.name}</FileNameDisplay>}
      <ErrorMessage>{fileError}</ErrorMessage>
      <Space />
      <GenerateButton onClick={handleGenerateClick}>Generate</GenerateButton>
      <Space />
      <ReadOnlyBox value={fileContents} readOnly />
    </Container>
  );
};

export default FileUploadPage;
