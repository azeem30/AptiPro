import React, { useEffect, useState } from 'react'

export default function ResultBox({resultData}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);    
    const [corrected, setCorrected] = useState(resultData.responseData[currentQuestionIndex].correctKey);
    const [selected, setSelected] = useState(resultData.responseData[currentQuestionIndex].selectedKey);
    useEffect(()=>{
        select();
        correct();
    }, [currentQuestionIndex]); 
    let placingContainer = {
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: '60%',
        display: 'flex',
        flexDirection: 'column'
    };
    let buttonStyle =  {
        marginLeft: '37%'
    };
    const nextQuestion = () => {
        if(currentQuestionIndex < resultData.responseData.length - 1){
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    const previousQuestion = () => {
        if(currentQuestionIndex > 0){
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    const select = () => {
        if(resultData.responseData[currentQuestionIndex].selectedKey === 'option1'){
            setSelected('A');
        }
        else if(resultData.responseData[currentQuestionIndex].selectedKey === 'option2'){
            setSelected('B');
        }
        else if(resultData.responseData[currentQuestionIndex].selectedKey === 'option3'){
            setSelected('C');
        }
        else if(resultData.responseData[currentQuestionIndex].selectedKey === 'option4'){
            setSelected('D');
        }
    };
    const correct = () => {
        if(resultData.responseData[currentQuestionIndex].correctKey === 'option1'){
            setCorrected('A');
        }
        else if(resultData.responseData[currentQuestionIndex].correctKey === 'option2'){
            setCorrected('B');
        }
        else if(resultData.responseData[currentQuestionIndex].correctKey === 'option3'){
            setCorrected('C');
        }
        else if(resultData.responseData[currentQuestionIndex].correctKey === 'option4'){
            setCorrected('D');
        }
    };
  return (
    <div className="container bg-info-subtle rounded border border-primary-subtle" style={placingContainer}>
        <div className='mx-1 my-2'>
          <p className='fw-semibold d-flex justify-content-between text-wrap w-100'>{`${currentQuestionIndex + 1}. ${resultData.responseData[currentQuestionIndex]?.questionText}`} <span className={resultData.responseData[currentQuestionIndex]?.questionDifficulty==='Easy'? 'text-success' : resultData.responseData[currentQuestionIndex]?.questionDifficulty === 'Medium' ? 'text-warning' : 'text-danger'}>{resultData.responseData[currentQuestionIndex]?.questionDifficulty}</span></p>
        </div>
        <p class={`form-control mb-2 ${resultData.responseData[currentQuestionIndex].selectedKey === resultData.responseData[currentQuestionIndex].correctKey ? 'text-white bg-success' : 'text-white bg-danger '}`} aria-label="readonly input example"><span className='fw-semibold mx-1'>{`Selected: ${selected}.`}</span>{resultData.responseData[currentQuestionIndex]?.selectedText}</p>
        <p class="form-control mb-2 bg-success border border-dark text-white" aria-label="readonly input example"><span className='fw-semibold mx-2'>{`Correct: ${corrected}.`}</span>{resultData.responseData[currentQuestionIndex]?.correctText}</p>
        <div style={buttonStyle} className="d-inline mt-1 mb-3">
            <button onClick={previousQuestion} className="btn btn-primary border border-dark mx-3 fw-semibold">Previous</button>
            <button onClick={nextQuestion} className="btn btn-primary border border-dark fw-semibold">Next</button>
        </div>
    </div>
  )
}
