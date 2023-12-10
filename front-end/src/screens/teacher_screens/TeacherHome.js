import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import '../../styles/teacher_styles/teacher_home.css'; // Import a CSS file for additional styles

export default function TeacherHome() {
  return (
    <Layout>
      <Navbar screenSide='teacher' />
      <div className='card-container'>
        <div className="card">
          <img src="https://cdn.britannica.com/30/220330-050-339CB471/Multiple-Choice-Test-Exam.jpg?w=600&q=60" className="card-img-top" alt="Conduct Tests"/>
          <div className="card-body">
            <h5 className="card-title">Conduct tests!</h5>
            <p className="card-text">Prepare the students for the final aptitude.</p>
            <Link to='/create_test' className="btn btn-primary">Create Test</Link>
          </div>
        </div>
        <div className="card">
          <img src="https://img.paperform.co/fetch/f_jpg,w_1800/https://s3.amazonaws.com/paperform-blog/2020/12/How-To-Analyze-Survey-Results.png" className="card-img-top" alt="Analyze Results"/>
          <div className="card-body">
            <h5 className="card-title">Analyze the Results!</h5>
            <p className="card-text">See where students lack and improve their performances.</p>
            <Link to="/teacher_results" className="btn btn-primary">Check Scores</Link>
          </div>
        </div>
        <div className="card">
          <img src="https://cdn.theatlantic.com/thumbor/Ot_erThCQgVVk016M-nKJrG_HhE=/603x0:4203x2700/1200x900/media/img/mt/2023/01/Dumb_Questions_02/original.jpg" className="card-img-top" alt="Add Questions"/>
          <div className="card-body">
            <h5 className="card-title">Add Questions!</h5>
            <p className="card-text">Add the questions of your choice into the dataset if you want.</p>
            <Link to='/add_questions' className="btn btn-primary">Add Question</Link>
          </div>
        </div>
      </div> 
    </Layout>
  );
}
