import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Alert from '../../components/Alert';

const separator = {
  height: '0.5px'
};

const Container = styled.div`
  background-color: white;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin: 70px auto;
`;

const Title = styled.h4`
  color: #333;
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableHeadCell = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 10px;
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

const DownloadButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  margin-left: 10px;
  display: ${({ fetched }) => (fetched ? 'inline-block' : 'none')};
  &:hover {
    background-color: #45a049; 
  }
`;

const FileNameDisplay = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
  &:hover {
    background-color: #45a049;
  }
`;

const FileUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContents, setFileContents] = useState([]);
  const [fileError, setFileError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetched, setFetched] = useState(false);
  const [message, setMessage] = useState({
    info: null,
    status: null
  });
  var signedToken = localStorage.getItem('authToken');

  const itemsPerPage = 5;

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

  const storeInMongo = async (data) => {
    const response = await fetch('https://backend-sigma-beige.vercel.app/api/add_desc_questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({signedToken, data})
    });
    const msg = await response.json();
    if(msg.success){
      setMessage({...message, info: 'Sent to Database Successfully', status: 'success'});
    }
    else if(msg.success || msg.duplication){
      setMessage({...message, info: 'Data already exists in Database', status: 'warning'});
    }
    else{
      setMessage({...message, info: 'Failed to send to Database', status: 'danger'});
    }
  };

  const handleGenerateClick = async () => {
    setIsLoading(true);
    setFileContents([]);
    setCurrentPage(1);

    if (!selectedFile) {
      setFileError('Please select a file to upload.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Error uploading file: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.error) {
        setFileError(data.error);
      } else {
        setFileContents(data);
        setFetched(true);
        storeInMongo(data); 
      }
    } catch (error) {
      console.error('Error processing file:', error);
      setFileError('An error occurred while processing the file. Please try again.');
    } finally {
      setIsLoading(false);
      setFileError('');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDownloadClick = () => {
    const blob = new Blob([JSON.stringify(fileContents)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; 
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fileContents.slice(indexOfFirstItem, indexOfLastItem);

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
        <div className="d-flex justify-content-center">
          <FileInputLabel htmlFor="fileInput">Choose File</FileInputLabel>
          <GenerateButton onClick={handleGenerateClick}>Generate</GenerateButton>
          <DownloadButton fetched={fetched} onClick={handleDownloadClick}>Download</DownloadButton>
        </div>
        <Alert info={message.info} status={message.status} />
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>No.</TableHeadCell>
              <TableHeadCell>Question</TableHeadCell>
              <TableHeadCell>Answer</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                <TableCell>{item.question}</TableCell>
                <TableCell>{item.answer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          {Array.from({ length: Math.ceil(fileContents.length / itemsPerPage) }, (_, i) => (
            <PageButton key={i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</PageButton>
          ))}
        </Pagination>
      </Container>
    </Layout>
  );
};

export default FileUploadPage;
