import React from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import ResultBox from '../components/ResultBox'

export default function DetailedResult() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const responseDataString = queryParams.get('data');
    const sideData = queryParams.get('side');
    const responseData = JSON.parse(responseDataString);
    let detailStyle = {
        marginTop: '12px'
    };  
    let detailContainer = {
        height: '50px',
        width: '100%',
    };
  return (
    <Layout>
        <Navbar screenSide={sideData} />
        <div style={detailContainer} className='bg-warning-subtle border-bottom border-warning'>
            <div className="d-flex justify-content-evenly">
            <p style={detailStyle} className='mx-3'>Title: <span className='fw-semibold'>{responseData.responseTitle}</span></p>
            <p style={detailStyle} className='mx-3'>Marks: <span className='fw-semibold'>{responseData.totalMarks}</span></p>
            <p style={detailStyle} className='mx-3'>Difficulty: <span className='fw-semibold'>{responseData.difficulty}</span></p>
            <p style={detailStyle} className='mx-3'>Subject: <span className="fw-semibold">{responseData.responseSubject}</span></p>
            <p style={detailStyle} className='mx-3'>Marks Obtained: <span className="fw-semibold">{responseData.marksScored}</span></p>
            <p style={detailStyle} className='mx-3'>Percentage: <span className="fw-semibold">{`${responseData.percentage}%`}</span></p>
            </div>
        </div>
        <ResultBox resultData={responseData} />
    </Layout>
  )
}
