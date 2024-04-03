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
  height: ${(props) => (props.hasContent ? `${props.scrollHeight}px` : 'auto')};
  display: ${(props) => (props.hasContent ? 'block' : 'none')};
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const Space = styled.div`
  margin-bottom: 15px;
`;

const ProgressContainer = styled.div`
  margin-top: 10px;
`;

const ProgressBar = styled.progress`
  width: 100%;
`;

const FileUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContents, setFileContents] = useState('');
  const [fileError, setFileError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const handleGenerateClick = async () => {
    setIsLoading(true); 
    setFileContents('');
    setUploadProgress(0);
    if (!selectedFile) {
      setFileError('Please select a file to upload.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try{
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: ProgressEvent => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      });
      if (!response.ok) {
        throw new Error(`Error uploading file: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.error) {
        setFileError(data.error);
      } else {
        const formattedResults = data.map(item => `Q: ${item.question}\nA: ${item.answer}`);
        setFileContents(formattedResults.join('\n\n'));
      }
    }
    catch(error){
      console.error('Error processing file:', error);
      setFileError('An error occurred while processing the file. Please try again.');
    }
    finally {
      setIsLoading(false); 
      setFileError('');
    }
  }

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
        {isLoading && (
          <ProgressContainer>
            <ProgressBar value={uploadProgress} max="100" />
          </ProgressContainer>
        )}
        <ReadOnlyBox value={fileContents} readOnly hasContent={fileContents !== ''} scrollHeight={document.getElementById('readOnlyBox')?.scrollHeight}/>
      </Container>
    </Layout>
  );
};

export default FileUploadPage;
