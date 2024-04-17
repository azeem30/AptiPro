import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Alert from '../../components/Alert'
import ConfirmationModal from '../../components/ConfirmationModal'

export default function AddQuestions() {
    useEffect(()=>{
        getTeacherSubjects();
    }, []);
    var signedToken = localStorage.getItem('authToken');
    const [questionData, setQuestionData] = useState({
        questionText: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctOption: '',
        questionDifficulty: '',
        subjectId: '',
        subjectName: ''
    });
    const [subjects, setSubjects] = useState([]);
    const [isConfirmationBoxVisible, setConfirmationBoxVisible] = useState(false);
    const [message, setMessage] = useState({
        info: null,
        status: null
    });
    let addQuestionStyle = {
        position: 'relative',
        top: '4%'
    };
    let separator = {
        height: '0.5px'
    };
    const getTeacherSubjects = async () => {
        const response = await fetch("https://backend-sigma-beige.vercel.app/api/subjects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({signedToken}) 
        });
        const data = await response.json();
        if(data.success){
            setSubjects(data.allSubjects);
        }
        else{
            setMessage({...message, info:'Failed to Fetch subjects!', status: 'danger'});
        }
    };
    const openConfirmationBox = () => {
        setConfirmationBoxVisible(true);
    };
    const closeConfirmationBox = () => {
        setConfirmationBoxVisible(false);
    };
    const addQuestion = async () => {
        const response = await fetch("https://backend-sigma-beige.vercel.app/api/add_questions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({questionData, signedToken})
        });
        const data = await response.json();
        if(data.success){
            setMessage({...message, info:'Question added successfully!', status: 'success'});
        }
        else{
            setMessage({...message, info:'Failed to add question!', status: 'danger'});
        }
    };
  return (
    <Layout>
        <Navbar screenSide='teacher' />
        <div className="card container w-50" style={addQuestionStyle}>
        <div className="card-body">
            <div className='d-flex justify-content-center'>
                <h4 className='fw-semibold text-wrap'>Add A Question</h4>
            </div>
            <div className='mb-3 bg-dark-subtle' style={separator}></div>
            <div className='d-block'>
                <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label fw-semibold">Question</label>
                <textarea onChange={(event)=>{setQuestionData({...questionData, questionText: event.target.value})}} class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                </div>
                <div class="input-group mb-3">
                <span class="input-group-text fw-semibold" id="basic-addon1">A</span>
                <input type="text" onChange={(event)=>{setQuestionData({...questionData, option1: event.target.value})}} class="form-control" placeholder="Option A" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                <span class="input-group-text fw-semibold" id="basic-addon1">B</span>
                <input type="text" onChange={(event)=>{setQuestionData({...questionData, option2: event.target.value})}} class="form-control" placeholder="Option B" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                <span class="input-group-text fw-semibold" id="basic-addon1">C</span>
                <input type="text" onChange={(event)=>{setQuestionData({...questionData, option3: event.target.value})}} class="form-control" placeholder="Option C" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                <span class="input-group-text fw-semibold" id="basic-addon1">D</span>
                <input type="text" onChange={(event)=>{setQuestionData({...questionData, option4: event.target.value})}} class="form-control" placeholder="Option D" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <ul class="list-group list-group-horizontal d-flex justify-content-center">
                    <span class="input-group-text mx-2 bg-success text-white fw-semibold" id="basic-addon1">Correct Option</span>
                    <button onClick={()=>{setQuestionData({...questionData, correctOption: 'a'})}} class={`list-group-item ${questionData.correctOption === 'a' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>Option A</button>
                    <button onClick={()=>{setQuestionData({...questionData, correctOption: 'b'})}} class={`list-group-item ${questionData.correctOption === 'b' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>Option B</button>
                    <button onClick={()=>{setQuestionData({...questionData, correctOption: 'c'})}} class={`list-group-item ${questionData.correctOption === 'c' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>Option C</button>
                    <button onClick={()=>{setQuestionData({...questionData, correctOption: 'd'})}} class={`list-group-item ${questionData.correctOption === 'd' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>Option D</button>
                </ul>
                <div className='d-flex justify-content-evenly my-3'>
                <ul class="list-group list-group-horizontal d-flex justify-content-center">
                    <span class="input-group-text mx-2 bg-dark text-white fw-semibold" id="basic-addon1">Difficulty</span>
                    <button onClick={()=>{setQuestionData({...questionData, questionDifficulty: 'Easy'})}} class={`list-group-item ${questionData.questionDifficulty === 'Easy' ? 'bg-success text-white' : 'bg-white text-success'}`}>Easy</button>
                    <button onClick={()=>{setQuestionData({...questionData, questionDifficulty: 'Medium'})}} class={`list-group-item ${questionData.questionDifficulty === 'Medium' ? 'bg-warning text-white' : 'bg-white text-warning'}`}>Medium</button>
                    <button onClick={()=>{setQuestionData({...questionData, questionDifficulty: 'Hard'})}} class={`list-group-item ${questionData.questionDifficulty === 'Hard' ? 'bg-danger text-white' : 'bg-white text-danger'}`}>Hard</button>
                </ul>
                <div class="dropdown">
                    <button id='subject_name_display' class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Subject
                    </button>
                    <ul class="dropdown-menu">
                        {
                            subjects.map((subject, index)=>(
                                <li 
                                    className='dropdown-item'
                                    key={subject.subjectId}
                                    onClick={
                                        ()=>{
                                            setQuestionData({...questionData, subjectId: subject.subjectId, subjectName: subject.subjectName});
                                            const subjectDisplay = document.getElementById('subject_name_display');
                                            subjectDisplay.textContent = subject.subjectName;
                                        }}>
                                    {subject.subjectName}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                </div>
            </div>
            <div className='mb-3 bg-dark-subtle' style={separator}></div>
            <div className='d-flex justify-content-center'>
                <button onClick={openConfirmationBox} className="btn btn-outline-success fw-semibold">Add Question</button>
            </div>
            </div>
            <Alert info={message.info} status={message.status} />
        </div>
        <ConfirmationModal isOpen={isConfirmationBoxVisible} onClose={closeConfirmationBox} onConfirm={addQuestion} test={questionData} purpose='Add Question' />
    </Layout>
  )
}
