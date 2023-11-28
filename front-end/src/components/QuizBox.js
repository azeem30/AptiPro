import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Alert from '../components/Alert'
import ConfirmationModal from './ConfirmationModal';
import Timer from './Timer';

export default function QuizBox({testData}) {
  useEffect(()=>{
    getQuestionsForQuiz();
  }, []);
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isConfirmationBoxVisible, setConfirmationBoxVisible] = useState(false);
  const [message, setMessage] = useState({
    info: null,
    status: null
  });
  var signedToken = localStorage.getItem('authToken');
  let placingContainer = {
    position: 'absolute',
    top: '20%',
    left: '5%',
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none'
  };  
  const getQuestionsForQuiz = async () => {
    const response = await fetch("http://localhost:8000/api/fetch_questions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({testData, signedToken})
    });
    const data = await response.json();
    if(data.success){
      setQuizQuestions(data.randomizedFetchedQuestions);
      setSelectedOptions(new Array(data.randomizedFetchedQuestions.length).fill({
        questionId: null,
        questionText: '',
        selectedKey: '',
        selectedText: '',
        correctKey: '',
        correctText: ''
      }));
    }
    else{  
      setMessage({...message, info: 'Failed to fetch questions', status: 'danger'});
    }
  };
  const handleOptionSelect = (questionId, questionText, selectedKey, selectedText, correctKey, correctText, questionDifficulty) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = {
      questionId,
      questionText,
      selectedKey,
      selectedText,
      correctKey, 
      correctText,
      questionDifficulty
    }
    setSelectedOptions(updatedSelectedOptions);
  };
  const handleNextQuestion = () => {
    if(currentQuestionIndex < quizQuestions.length - 1){
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const openConfirmationBox = () => {
    setConfirmationBoxVisible(true);
  };
  const closeConfirmationBox = () => {
    setConfirmationBoxVisible(false);
  };
  const handleSubmit = () => {
    openConfirmationBox(); 
  };
  const submitTestAfterConfirmation = () =>{
    closeConfirmationBox();
    submitTest();
  }; 
  const submitTest = async () => {
    var marksScored = calculateMarks();
    const response = await fetch("http://localhost:8000/api/submit_test", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({signedToken, testData, selectedOptions, marksScored})
    });
    const data  = await response.json();
    if(data.success){
      setMessage({...message, info: 'Test submitted successfully', status: 'success'});
      setTimeout(()=>{
        navigate('/scheduled_tests');
      }, 3000);
    }
    else{
      setMessage({...message, info: 'Failed to submit test', status: 'danger'});
    }
  };
  const calculateMarks = () => {
    let score = 0;
    for(let i = 0; i < selectedOptions.length; i++){
      if((selectedOptions[i].correctKey === selectedOptions[i].selectedKey) && (selectedOptions[i].selectedKey !== '' && selectedOptions[i].correctKey !== '')){
        score += 3.33;
      }
    }
    return score;
  };
  return (
    <div className="container bg-info-subtle rounded border border-primary-subtle" style={placingContainer}>
      <div className='mx-1 my-2'>
          <p className='fw-semibold d-flex justify-content-between text-wrap w-100'>{`${currentQuestionIndex + 1}. ${quizQuestions[currentQuestionIndex]?.questionText}`} <span className={quizQuestions[currentQuestionIndex]?.questionDifficulty==='Easy'? 'text-success' : quizQuestions[currentQuestionIndex]?.questionDifficulty === 'Medium' ? 'text-warning' : 'text-danger'}>{quizQuestions[currentQuestionIndex]?.questionDifficulty}</span></p>
      </div>
        <div className='border border-warning-subtle'>
          <ul className="list-group">
          {
            ['option1', 'option2', 'option3', 'option4'].map((selectedKey) => (
              <li className="list-group-item" key={selectedKey}>
                <input
                  className="form-check-input me-1"
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={selectedKey}
                  id={`option-${selectedKey}`}
                  checked={selectedKey === selectedOptions[currentQuestionIndex]?.selectedKey}
                  onChange={() => {
                    const questionId = quizQuestions[currentQuestionIndex].questionId;
                    const questionText = quizQuestions[currentQuestionIndex].questionText;
                    const selectedText = quizQuestions[currentQuestionIndex][selectedKey];
                    const questionObject = quizQuestions.find(question => question.questionId === quizQuestions[currentQuestionIndex].questionId);
                    var correctKey, correctText, questionDifficulty;
                    if(questionObject.correctOption === 'a'){
                      correctKey = 'option1';
                      correctText = quizQuestions[currentQuestionIndex]?.option1;
                    }
                    else if(questionObject.correctOption === 'b'){
                      correctKey = 'option2';
                      correctText =  quizQuestions[currentQuestionIndex]?.option2;
                    }
                    else if(questionObject.correctOption === 'c'){
                      correctKey = 'option3';
                      correctText = quizQuestions[currentQuestionIndex]?.option3;
                    }
                    else if(questionObject.correctOption === 'd'){
                      correctKey = 'option4';
                      correctText = quizQuestions[currentQuestionIndex]?.option4;
                    }
                    questionDifficulty = questionObject.questionDifficulty;
                    handleOptionSelect(questionId, questionText, selectedKey, selectedText, correctKey, correctText, questionDifficulty);
                  }}
                />
                <label className="form-check-label text-wrap" htmlFor={`option-${selectedKey}`}>
                  {quizQuestions[currentQuestionIndex]?.[selectedKey]}
                </label>
              </li>
            ))
          } 
          </ul>
        </div>
        <div className='d-flex justify-content-around'>
              <button className='btn btn-primary border border-dark my-2' onClick={handlePreviousQuestion}>Previous</button>
              <Timer initialTime={testData.testDuration * 60} onTimerExpiration={submitTest} />
              <button className='btn btn-primary border border-dark my-2' onClick={handleNextQuestion}>Next</button>
              <button disabled={!(currentQuestionIndex === quizQuestions.length -1)} onClick={handleSubmit} className="btn btn-success border border-dark my-2">Submit</button>
        </div>
      <Alert info={message.info} status={message.status}/>
      <ConfirmationModal isOpen={isConfirmationBoxVisible} onClose={closeConfirmationBox} onConfirm={submitTestAfterConfirmation} test={null} purpose="Submit Test" />
    </div>
  )
}
