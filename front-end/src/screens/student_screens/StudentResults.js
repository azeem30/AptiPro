import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Alert from '../../components/Alert'
import '../../styles/student_styles/student_results.css'

export default function StudentResults() {
    useEffect(()=> { 
        getStudentSubjects(); 
        getResponses(); 
    }, []);
    const navigate = useNavigate();
    const [responses, setResponses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [message, setMessage] = useState({
        info: null,
        status: null
    });
    const filteredResponses = filter ? responses.filter((result) => result.responseSubject === filter) : responses;
    var signedToken = localStorage.getItem('authToken');
    const getStudentSubjects = async () => {
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
            setResponses(data.results);
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
        const side = 'student';
        navigate(`/detailed_result?data=${encodeURIComponent(JSON.stringify(responseData))}&side=${side}`);
    };
  return (
    <Layout>
            <Navbar screenSide='student' />
            <div className="container rounded bg-white mt-4">
                <div className="d-flex justify-content-between align-items-center my-3">
                    <h4 className="card-title mt-2 mx-3">Submitted Tests</h4>
                    <div className="btn-group button">
                        <button
                            type="button"
                            className="btn btn-white dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id='subject_display'
                        >
                            Filter
                        </button>
                        <ul className="dropdown-menu">
                            {subjects.map((subject, index) => (
                                <li
                                    className='dropdown-item'
                                    key={subject.subjectId}
                                    onClick={() => {
                                        const subjectDisplay = document.getElementById('subject_display');
                                        subjectDisplay.textContent = subject.subjectName;
                                        handleFilter(subject.subjectName);
                                    }}
                                >
                                    {subject.subjectName}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="btn-group button">
                        <button
                            type="button"
                            className="btn btn-white dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Sort by
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <a onClick={() => { handleSort('desc'); }} className="dropdown-item" href="#">
                                    Marks: High to Low
                                </a>
                            </li>
                            <li>
                                <a onClick={() => { handleSort('asc'); }} className="dropdown-item" href="#">
                                    Marks: Low to High
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-secondary" style={{ height: '1px' }}></div>
                <div className='my-2'>
                    {filteredResponses.length === 0 ? (
                        <p className='mt-2 text-center fw-normal'>You have not submitted any responses!</p>
                    ) : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th className='table-cell fw-semibold'>No.</th>
                                    <th className='table-cell fw-semibold'>Title</th>
                                    <th className='table-cell fw-semibold'>Marks Obtained</th>
                                    <th className='table-cell fw-semibold'>Marks</th>
                                    <th className='table-cell fw-semibold'>Percentage</th>
                                    <th className='table-cell fw-semibold'>Difficulty</th>
                                    <th className='table-cell fw-semibold'>Subject</th>
                                    <th className='table-cell fw-semibold'>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResponses.map((result, index) => (
                                    <tr key={result.responseId}>
                                        <td className='table-cell'>{index + 1}</td>
                                        <td className='table-cell'>{result.responseTitle}</td>
                                        <td className='table-cell'>{result.marksScored}</td>
                                        <td className='table-cell'>{result.totalMarks}</td>
                                        <td className='table-cell'>{`${result.percentage}%`}</td>
                                        <td className='table-cell'>{result.difficulty}</td>
                                        <td className='table-cell'>{result.responseSubject}</td>
                                        <td className='table-cell'>
                                            <button onClick={() => { openResult(result); }} className='btn btn-success view-button'>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <Alert info={message.info} status={message.status} />
        </Layout>
  )
}
