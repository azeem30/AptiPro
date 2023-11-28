import React from 'react'

export default function ConfirmationModal({isOpen, onClose, onConfirm, test, purpose}) {
    const modalStyle = {
        display: isOpen ? 'block' : 'none',
    };
  return (
    <div>
    { 
        purpose === 'Create Test' && 
        <div className='modal' style={modalStyle} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role='document'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Scheduling</h5>
                        <button type="button" className="btn btn-danger" onClick={onClose} aria-label="Close">&times;</button>
                    </div>
                    <div className="modal-body d-block">
                        <p className='fw-medium'>Title: <span className='fw-normal'>{`${test.testTitle}`}</span></p>
                        <p className='fw-medium'>Marks: <span className='fw-normal'>{`${test.testMarks}`}</span></p>
                        <p className='fw-medium'>No. of Questions: <span className='fw-normal'>{`${test.testQuestionCount}`}</span></p>
                        <p className='fw-medium'>Duration: <span className='fw-normal'>{`${test.testDuration} minutes`}</span></p>
                        <p className='fw-medium'>Difficulty: <span className='fw-normal'>{`${test.testDifficulty}`}</span></p>
                        <p className='fw-medium'>Date: <span className='fw-normal'>{`${test.testDate}`}</span></p>
                        <p className='fw-medium'>Time: <span className='fw-normal'>{`${test.testTime}`}</span></p>
                        <p className='fw-medium'>Subject: <span className='fw-normal'>{`${test.testSubject}`}</span></p>
                        <p className='d-flex justify-content-center fw-semibold'>Are you sure you want to schedule this test?</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                    <button type="button" onClick={onClose} className="btn btn-secondary">
                    Cancel
                    </button>
                    <button type="button" onClick={onConfirm} className="btn btn-primary">
                    Confirm
                    </button>
                    </div>
                </div>
        </div>
        </div> 
    }
    { 
        purpose === 'Submit Test' && 
        <div className='modal' style={modalStyle} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role='document'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Submit Test</h5>
                        <button type="button" className="btn btn-danger" onClick={onClose} aria-label="Close">&times;</button>
                    </div>
                    <div className="modal-body d-block">
                        <p className='d-flex justify-content-center fw-semibold'>Are you sure you want to schedule this test?</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                    <button type="button" onClick={onClose} className="btn btn-secondary">
                    Cancel
                    </button>
                    <button type="button" onClick={onConfirm} className="btn btn-primary">
                    Confirm
                    </button>
                    </div>
                </div>
        </div>
        </div> 
    }
    { 
        purpose === 'Logout' &&
        <div className='modal' style={modalStyle} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role='document'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Logout</h5>
                        <button type="button" className="btn btn-danger" onClick={onClose} aria-label="Close">&times;</button>
                    </div>
                    <div className="modal-body d-block">
                        <p className='d-flex justify-content-center fw-semibold'>Are you sure you want to logout?</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                    <button type="button" onClick={onClose} className="btn btn-secondary">
                    Cancel
                    </button>
                    <button type="button" onClick={onConfirm} className="btn btn-primary">
                    Confirm
                    </button>
                    </div>
                </div>
        </div>
        </div> 
    }
    { 
        purpose === 'Add Question' && 
        <div className='modal' style={modalStyle} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role='document'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Question</h5>
                        <button type="button" className="btn btn-danger" onClick={onClose} aria-label="Close">&times;</button>
                    </div>
                    <div className="modal-body d-block">
                        <p className='fw-medium'>Question: <span className='fw-normal'>{`${test.questionText}`}</span></p>
                        <p className='fw-medium'>A: <span className='fw-normal'>{`${test.option1}`}</span></p>
                        <p className='fw-medium'>B: <span className='fw-normal'>{`${test.option2}`}</span></p>
                        <p className='fw-medium'>C: <span className='fw-normal'>{`${test.option3}`}</span></p>
                        <p className='fw-medium'>D: <span className='fw-normal'>{`${test.option4}`}</span></p>
                        <p className='fw-medium'>Correct: <span className='fw-normal'>{`${test.correctOption}`}</span></p>
                        <p className='fw-medium'>Difficulty: <span className='fw-normal'>{`${test.questionDifficulty}`}</span></p>
                        <p className='fw-medium'>Subject: <span className='fw-normal'>{`${test.subjectName}`}</span></p>
                        <p className='d-flex justify-content-center fw-semibold'>Are you sure you want to add this question?</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                    <button type="button" onClick={onClose} className="btn btn-secondary">
                    Cancel
                    </button>
                    <button type="button" onClick={onConfirm} className="btn btn-primary">
                    Confirm
                    </button>
                    </div>
                </div>
        </div>
        </div> 
    }
    </div>
  )
}
