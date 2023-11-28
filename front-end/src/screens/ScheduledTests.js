import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Alert from '../components/Alert'

export default function ScheduledTests() {
    useEffect(() => {getScheduledTests()}, []);
    const navigate = useNavigate();
    const [scheduledTests, setScheduledTests] = useState([]);
    const [message, setMessage] = useState({
        info: null,
        status: null
    });
    var signedToken = localStorage.getItem('authToken');
    let testListCardStyle = {
        width: '90%'
    };
    let containerStyle = {
        position:'relative',
        top: '4%',
    };
    let separator = {
        height: '0.5px',
        marginTop: '2px',
        marginBottom: '15px'
    };
    let startButtonStyle ={
        width: '60px',  
        height: '40px',
    };
    const getScheduledTests = async () => {
        const response = await fetch("http://localhost:8000/api/scheduled_tests", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({signedToken})
        });
        const data = await response.json();
        if(data.success){
            setScheduledTests(data.scheduledTests);
            //setMessage({...message, info: 'These are the scheduled tests for you!', status: 'success'});
        }
        else{
            setMessage({...message, info: 'Failed to fetch scheduled Tests', status: 'danger'});
        }
    }
    const isTestReady = (date, time) => {
        const testDateTime = new Date(`${date}T${time}`);
        const currentDateTime = new Date();
        return testDateTime <= currentDateTime;
    }
    function beginTest(testData) {
        navigate(`/quiz?data=${encodeURIComponent(JSON.stringify(testData))}`);
    }
  return (
    <Layout>
        <Navbar screenSide='student' />
        <div className="container d-flex justify-content-center" style={containerStyle}>
            <div class="card" style={testListCardStyle}>
                <div class="card-body">
                    <div className='d-flex justify-content-center'>
                        <h4 class="card-title">Pending Tests</h4>
                    </div>
                    <div className='bg-secondary' style={separator}></div>
                    <div className='mb-3'>
                    {scheduledTests.length === 0 ? (
                                <p className='d-flex justify-content-center fw-normal'>No tests scheduled for you at the moment!</p>
                            ) : (
                                <ol className="list-group">
                                    {scheduledTests.map((test, index) => (
                                        <div className='d-flex justify-content-evenly' key={index}>
                                            <li className='d-flex w-100 my-2 justify-content-between text-wrap rounded border border-success-subtle list-group-item'>
                                                <p className='my-2'>Title: <span className='fw-semibold'>{test.testTitle}</span></p>
                                                <p className='my-2'>Marks: <span className='fw-semibold'>{test.testMarks}</span></p>
                                                <p className='my-2'>Duration: <span className='fw-semibold'>{`${test.testDuration} minutes`}</span></p>
                                                <p className='my-2'>Difficulty: <span className='fw-semibold'>{test.testDifficulty}</span></p>
                                                <p className='my-2'>Subject: <span className="fw-semibold">{test.testSubject}</span></p>
                                                <p className='my-2'>Date: <span className="fw-semibold">{test.testDate}</span></p>
                                                <p className='my-2'>Time: <span className="fw-semibold">{test.testTime}</span></p>
                                                <button onClick={()=>beginTest(test)} disabled={!isTestReady(test.testDate, test.testTime)} className='btn btn-success' style={startButtonStyle}>Start</button>
                                            </li>
                                        </div>
                                    ))}
                                </ol>
                    )}
                    </div>
                </div>
                <Alert info={message.info} status={message.status} />
            </div>
        </div>
    </Layout>
  )
}
