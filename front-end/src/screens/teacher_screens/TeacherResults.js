import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar'
import Layout from '../../components/Layout'
import Alert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';

export default function TeacherResults() {
    useEffect(()=> { 
        getTeacherSubjects(); 
        getResponses(); 
    }, []);
    const navigate = useNavigate();
    var signedToken = localStorage.getItem('authToken');
    const [responses, setResponses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [message, setMessage] = useState({
        info: null,
        status: null
    });
    const filteredResponses = filter ? responses.filter((result) => result.responseSubject === filter) : responses;
    let containerStyle = {
        position: 'relative',
        top: '3%',
        width:'80%'
    };
    let separator = {
        height: '0.5px',
        marginTop: '3px'
    };
    let buttonStyle = {
        height:'40px'
    };
    let headerStyle = {
        position: 'relative',
        top: '17px',
        left: '-50px'
    };
    let viewButtonStyle = {
        width: '60px', 
        fontSize: '12px', 
        height: '30px'
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
        }else{
            setMessage({...message, info: 'Failed to fetch subjects', status: 'danger'});
        }
    };
    const getResponses = async () => {
        const response = await fetch("http://localhost:8000/api/fetch_responses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({signedToken})
        });
        const data = await response.json();
        if(data.success){
            setResponses(data.combinedResults);
        }else{
            setMessage({...message, info: 'Failed to fetch responses', status: 'danger'});
        }
    };
    const handleFilter = (appliedFilter) => {
        setFilter(appliedFilter);
    };
    const handleSort = (appliedSort) => {
        setSort(appliedSort);
        if(sort === 'asc'){
            const sortedResponses = [...responses].sort((a, b) => a.marksScored - b.marksScored);
            setResponses(sortedResponses);
        }
        else if(sort === 'desc'){
            const sortedResponses = [...responses].sort((a, b) => b.marksScored - a.marksScored);
            setResponses(sortedResponses);
        }
    };
    function openResult(responseData) {
        const side = 'teacher';
        navigate(`/detailed_result?data=${encodeURIComponent(JSON.stringify(responseData))}&side=${side}`);
    };  
  return (
    <Layout>
        <Navbar screenSide='teacher' />
        <div style={containerStyle} className="container rounded bg-white">
                <div className="d-flex justify-content-around">
                    <h4 style={headerStyle} className="card-title">Submitted Tests</h4>
                        <div className="btn-group my-2" style={buttonStyle}>
                            <button type="button" id='subject_display' className="btn mt-1 fw-semibold btn-white text-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Filter
                            </button>
                            <ul className="dropdown-menu">
                                    {
                                        subjects.map((subject, index)=>(
                                            <li 
                                                className='dropdown-item'
                                                key={subject.subjectId}
                                                onClick={()=>{
                                                    const subjectDisplay = document.getElementById('subject_display');
                                                    subjectDisplay.textContent = subject.subjectName;
                                                    handleFilter(subject.subjectName);
                                                }}>
                                                {subject.subjectName}
                                            </li>
                                        ))
                                    }
                            </ul>
                        </div>
                        <div className="btn-group my-2" style={buttonStyle}>
                            <button type="button" className="btn mt-1 fw-semibold btn-white text-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort by
                            </button>
                            <ul className="dropdown-menu">
                                <li><a onClick={()=>{handleSort('desc');}} className="dropdown-item" href="#">Marks: High to Low</a></li>
                                <li><a onClick={()=>{handleSort('asc');}} className="dropdown-item" href="#">Marks: Low to High</a></li>
                            </ul>
                        </div>
                </div>
                <div className="bg-secondary" style={separator}></div>
                <div className='my-2'>
                    {
                        filteredResponses.length === 0 ? (
                            <p className='d-flex mt-2 justify-content-center fw-normal'>You have not submitted any responses!</p>
                        ) : (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th className='col fw-semibold'>No.</th>
                                        <th className='col fw-semibold'>Roll Nox</th>
                                        <th className='col fw-semibold'>Name</th>
                                        <th className='col fw-semibold'>Semester</th>
                                        <th className='col fw-semibold'>Title</th>
                                        <th className='col fw-semibold'>Marks Obtained</th>
                                        <th className='col fw-semibold'>Marks</th>
                                        <th className='col fw-semibold'>Percentage</th>
                                        <th className='col fw-semibold'>Difficulty</th>
                                        <th className='col fw-semibold'>Subject</th>
                                        <th className='col fw-semibold'>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredResponses.map((result, index) => (
                                            <tr key={result.responseId}>
                                                <td className="col">{index + 1}</td>
                                                <td className="col">{result.rollNo}</td>
                                                <td className="col">{result.name}</td>
                                                <td className="col">{result.semester}</td>
                                                <td className="col">{result.responseTitle}</td>
                                                <td className="col">{result.marksScored}</td>
                                                <td className="col">{result.totalMarks}</td>
                                                <td className="col">{`${result.percentage}%`}</td>
                                                <td className="col">{result.difficulty}</td>
                                                <td className="col">{result.responseSubject}</td>
                                                <td className="col"><button onClick={()=>{openResult(result);}} className='btn btn-success' style={viewButtonStyle}>View</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                    )}
                </div>
                <Alert info={message.info} status={message.status} />
            </div>
    </Layout>
  )
}
