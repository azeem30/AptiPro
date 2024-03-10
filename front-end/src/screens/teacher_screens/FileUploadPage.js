import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';

const separator = {
  height: '0.5px'
};

const Container = styled.div`
  background-color: white;
  width: 400px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin: 70px auto;
`;

const Title = styled.h4`
  color: #333;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: 1px solid #4caf50;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  &:hover {
    background-color: #45a049;
  }
`;

const GenerateButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  margin-left: 10px;
  &:hover {
    background-color: #45a049; 
  }
`;

const FileNameDisplay = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;

const ReadOnlyBox = styled.textarea`
  width: 100%;
  min-height: 50px;
  margin-bottom: 15px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  display: ${(props) => (props.hasContent ? 'block' : 'none')};
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
      const allowedTypes = ['application/pdf', 'text/plain'];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setFileError('');
      } else {
        setFileError('Please upload a PDF or TXT file.');
      }
    }
  };

  const handleFileInputClick = () => {
    document.getElementById('fileInput').value = null;
  };

  const handleGenerateClick = () => {
    const generatedContents = `Generated contents for ${selectedFile ? selectedFile.name : ''}`;
    setFileContents(generatedContents);
  };

  return (
    <Layout>
      <Navbar screenSide="teacher" />
      <Container>
        <Title className='d-flex justify-content-center'>Descripto</Title>
        <div className='mb-3 bg-dark-subtle' style={separator}></div>
        <FileInput
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          onClick={handleFileInputClick}
        />
        {selectedFile && <FileNameDisplay className='d-flex justify-content-center'>{selectedFile.name}</FileNameDisplay>}
        <ErrorMessage className='d-flex justify-content-center'>{fileError}</ErrorMessage>
        <Space />
        <div className="justify-content-center" style={{ display: 'flex', alignItems: 'center' }}>
          <FileInputLabel htmlFor="fileInput" style={{ marginRight: '10px' }}>
            Choose File
          </FileInputLabel>
          <GenerateButton onClick={handleGenerateClick}>Generate</GenerateButton>
        </div>
        <Space />
        <ReadOnlyBox value={fileContents} readOnly hasContent={fileContents !== ''} />
      </Container>
    </Layout>
  );
};

export default FileUploadPage;
