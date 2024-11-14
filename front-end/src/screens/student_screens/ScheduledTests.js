import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Alert from '../../components/Alert'
import '../../styles/student_styles/scheduled_tests.css'

export default function ScheduledTests() {
    useEffect(() => {getScheduledTests()}, []);
    const navigate = useNavigate();
    const [scheduledTests, setScheduledTests] = useState([]);
    const [message, setMessage] = useState({
        info: null,
        status: null
    });
    var signedToken = localStorage.getItem('authToken');
    const getScheduledTests = async () => {
        const response = await fetch("https://back-end-rosy-five.vercel.app/api/scheduled_tests", {
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
        <div className="container d-flex justify-content-center container-style">
            <div class="card test-card-style">
                <div class="card-body">
                    <div className='d-flex justify-content-center'>
                        <h4 class="card-title">Pending Tests</h4>
                    </div>
                    <div className='bg-secondary separator'></div>
                    <div className='my-2'>
                    {
                        scheduledTests.length === 0 ? (
                            <p className='d-flex mt-2 justify-content-center fw-normal'>No tests scheduled for you at the moment!</p>
                        ) : (
                            <table className='table table-striped table-bordered table-hover'>
                                <thead>
                                    <tr>
                                        <th className='col fw-semibold'>No.</th>
                                        <th className='col fw-semibold'>Title</th>
                                        <th className='col fw-semibold'>Marks</th>
                                        <th className="col fw-semibold">Questions</th>
                                        <th className='col fw-semibold'>Duration</th>
                                        <th className='col fw-semibold'>Difficulty</th>
                                        <th className='col fw-semibold'>Subject</th>
                                        <th className='col fw-semibold'>Date</th>
                                        <th className='col fw-semibold'>Time</th>
                                        <th className='col fw-semibold'>Enter</th>
                                    </tr>
                                </thead>
                                <tbody className='table-success'>
                                    {
                                        scheduledTests.map((test, index) => (
                                            <tr key={test.testTitle}>
                                                <td className="col">{index + 1}</td>
                                                <td className="col">{test.testTitle}</td>
                                                <td className="col">{test.testMarks}</td>
                                                <td className="col">{test.testQuestionCount}</td>
                                                <td className="col">{`${test.testDuration} minutes`}</td>
                                                <td className="col">{test.testDifficulty}</td>
                                                <td className="col">{test.testSubject}</td>
                                                <td className="col">{test.testDate}</td>
                                                <td className="col">{test.testTime}</td>
                                                <td className="col"><button onClick={()=>beginTest(test)} disabled={!isTestReady(test.testDate, test.testTime)} className='btn btn-success start-button'>Start</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                    )}
                </div>
                </div>
                <Alert info={message.info} status={message.status} />
            </div>
        </div>
    </Layout>
  )
}
