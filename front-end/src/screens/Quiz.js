import {React} from 'react'
import { useLocation} from 'react-router-dom'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import QuizBox from '../components/QuizBox';

export default function Quiz() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const testDataString = queryParams.get('data');
    const testData = JSON.parse(decodeURIComponent(testDataString));
    let detailStyle = {
        marginTop: '12px'
    };
    let detailContainer = {
        height: '50px',
        width: '100%',
    };
  return (
    <Layout>
        <Navbar screenSide='student' />
        <div style={detailContainer} className='bg-warning-subtle border-bottom border-warning'>
            <div className="d-flex justify-content-evenly">
            <p style={detailStyle} className='mx-3'>Title: <span className='fw-semibold'>{testData.testTitle}</span></p>
            <p style={detailStyle} className='mx-3'>Marks: <span className='fw-semibold'>{testData.testMarks}</span></p>
            <p style={detailStyle} className='mx-3'>Duration: <span className='fw-semibold'>{`${testData.testDuration} minutes`}</span></p>
            <p style={detailStyle} className='mx-3'>Difficulty: <span className='fw-semibold'>{testData.testDifficulty}</span></p>
            <p style={detailStyle} className='mx-3'>Date: <span className='fw-semibold'>{testData.testDate}</span></p>
            <p style={detailStyle} className='mx-3'>Time: <span className='fw-semibold'>{testData.testTime}</span></p>
            <p style={detailStyle} className='mx-3'>Subject: <span className="fw-semibold">{testData.testSubject}</span></p>
            </div>
        </div>
        <QuizBox testData={testData} />
    </Layout>
  )
}
