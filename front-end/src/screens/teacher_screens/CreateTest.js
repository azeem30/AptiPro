import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Alert from '../../components/Alert'
import ConfirmationModal from '../../components/ConfirmationModal'

export default function CreateTest() {
    const [test, setTest] = useState({
        testId: '',
        testTitle: '',
        testMarks: 0,
        testQuestionCount: 0,
        testDuration: 0,
        testDifficulty: '',
        testDate: '',
        testTime: '',
        testSubject: ''
    });
    const [subjects, setSubjects] = useState([]);
    const [isConfirmationBoxVisible, setConfirmationBoxVisible] = useState(false);
    const [department, setDepartment] = useState('');
    const [message, setMessage] = useState({
        info: null,
        status: null
    });
    var signedToken = localStorage.getItem('authToken');
    useEffect(() => {
        getTeacherSubjects();
    }, []);
    const scheduleFormStyle = {
        position: 'relative',
        top: '6%'
    };
    const separator = {
        height: '0.5px'
    };
    const departmentStyle ={
       marginTop: '-4px', 
       marginLeft: '7px'
    };
    const difficultyStyle ={
        marginLeft: '13px'
    };
    const textInputStyle = {
        width: '170px'
    };
    const bottomDiv = {
        marginTop: '40px'
    };
    const durationStyle = {
        marginTop: '31px'
    };
    const topDivStyle = {
        marginRight: '30px'
    };
    const openConfirmationBox = () => {
        setConfirmationBoxVisible(true);
    };
    const closeConfirmationBox = () => {
        setConfirmationBoxVisible(false);
    };
    const scheduleTestAfterConfirmation = () => {
        closeConfirmationBox();
        createTest();
    };
    const getTeacherSubjects = async () => {
        const response = await fetch("http://localhost:8000/api/subjects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({signedToken}) 
        });
        const data = await response.json();
        if(data.success){
            setSubjects(data.allSubjects);
            setDepartment(data.departmentName);
        }
        else{
            console.log("Failed to fetch subjects");
        }
    }
    const createTest = async () => {
        const response = await fetch("http://localhost:8000/api/create_test", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({test, signedToken})
        });
        const data = await response.json();
        if(data.success){
            setMessage({...message, info: 'Test Created Successfully!', status: 'success'});
            setTest({
                ...test,
                testId: '',
                testTitle: '',
                testMarks: 0,
                testDuration: 0,
                testDifficulty: '',
                testDate: '',
                testTime: '',
                testSubject: ''
            });
        }   
        else{
            setMessage({...message, info: 'Failed to create test! Please Retry', status: 'danger'});
        }
    }
  return (
    <Layout>
        <Navbar screenSide='teacher' />
        <div className="card container w-50" style={scheduleFormStyle}>
            <div className="card-body">
                <div className='d-flex justify-content-center'>
                    <h4 className='fw-semibold text-wrap'>Create a Test</h4>
                </div>
                <div className='mb-3 bg-dark-subtle' style={separator}></div>
                <div className='d-flex justify-content-around' style={topDivStyle}>
                    <div className="mb-3">
                        <label for="testTitleInput" className="form-label fw-semibold">Title</label>
                        <input type="text" onChange={(event)=>{setTest({...test, testTitle: event.target.value})}} className="form-control" id="testTitleInput" style={textInputStyle}/>
                    </div>
                    <div className='mb-3'>
                        <label for="testMarksInput" className="form-label fw-semibold">Marks</label>
                        <input type="text" onChange={(event)=>{setTest({...test, testMarks: parseInt(event.target.value)})}} className="form-control" id="testMarksInput"/>
                    </div>
                    <div className="btn-group dropdown h-25" style={durationStyle}>
                            <button type="button" className="btn btn-success border border-dark-subtle dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {test.testDuration === 60 ? '60 minutes' : test.testDuration === 120 ? '120 minutes' : 'Duration'}
                            </button>
                            <ul className="dropdown-menu">
                            <li><a onClick={()=>{setTest({...test, testDuration: 5})}} className="dropdown-item">5 minutes</a></li>
                                <li><a onClick={()=>{setTest({...test, testDuration: 60})}} className="dropdown-item">60 minutes</a></li>
                                <li><a onClick={()=>{setTest({...test, testDuration: 120})}} className="dropdown-item">120 minutes</a></li>
                            </ul>
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <div className="mb-3">
                        <label htmlFor="testDateInput" className="form-label fw-semibold">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="testDateInput"
                            onChange={(event)=>{
                                setTest({...test, testDate: event.target.value});
                            }}
                            style={textInputStyle}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="testTimeInput" className="form-label fw-semibold">Time</label>
                        <input
                                type="time"
                                className="form-control"
                                id="testTimeInput"
                                onChange={(event)=>{
                                    setTest({...test, testTime: event.target.value});
                                }}
                                style={textInputStyle}
                        />
                    </div>
                    <div className='mb-3'>
                        <label for="testCountInput" className="form-label fw-semibold">No. of Questions</label>
                        <input type="text" onChange={(event)=>{setTest({...test, testQuestionCount: parseInt(event.target.value)})}} className="form-control" id="testCountInput"/>
                    </div>
                </div>
                <div className='d-flex justify-content-around' style={bottomDiv}>
                    <div className="dropdown">
                        <button id='subject-dropdown-button' className="btn btn-success border border-dark-subtle dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {'Subject'}
                        </button>
                        <ul className="dropdown-menu">
                        {subjects.map((subject, index) => (
                            <li key={index}
                                    className="dropdown-item"
                                    onClick={()=>{
                                        setTest({...test, testSubject: subject.subjectName});
                                        document.getElementById('subject-dropdown-button').textContent = subject.subjectName;
                                    }}>
                                    <span className='fw-semibold'>{`${subject.semester}.`}</span> {subject.subjectName}
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div style={difficultyStyle}>
                    <ul className="list-group list-group-horizontal">
                        <button onClick={()=>{setTest({...test, testDifficulty: 'Easy'});}} className={`list-group-item border border-dark ${test.testDifficulty === 'Easy' ? 'bg-white text-success fw-semibold' : 'bg-success text-white'}`} id="d_simple">Simple</button>
                        <button  onClick={()=>{setTest({...test, testDifficulty: 'Medium'});}} className={`list-group-item border border-dark ${test.testDifficulty === 'Medium' ? 'bg-white text-dark fw-semibold' : 'bg-warning text-dark'}`} id="d_medium">Medium</button>
                        <button onClick={()=>{setTest({...test, testDifficulty: 'Hard'});}} className={`list-group-item border border-dark ${test.testDifficulty === 'Hard' ? 'bg-white text-danger fw-semibold' : 'bg-danger text-white'}`} id="d_hard">Hard</button>
                        <button  onClick={()=>{setTest({...test, testDifficulty: 'Combined'});}} className={`list-group-item border border-dark ${test.testDifficulty === 'Combined' ? 'bg-white text-dark fw-semibold' : 'bg-dark text-white'}`} id="d_combined">Combined</button>
                    </ul>
                    </div>
                    <div style={departmentStyle}> 
                        <p className='fs-5 fw-normal text-info-emphasis' style={departmentStyle}>Department: <span className='fw-semibold text-dark d-inline text-wrap'>{department}</span></p>
                    </div>
                </div>
                <div className='mt-3 bg-dark-subtle' style={separator}></div>
                <div className="d-flex justify-content-center mt-3">
                    <button type="button" onClick={openConfirmationBox} className="btn btn-outline-success fw-semibold">Create Test</button>
                </div>
                <ConfirmationModal
                    isOpen={isConfirmationBoxVisible}
                    onClose={closeConfirmationBox}
                    onConfirm={scheduleTestAfterConfirmation}
                    test={test}
                    purpose='Create Test'
                />
                <Alert info={message.info} status={message.status} /> 
            </div>
        </div>
    </Layout>
  )
}   
