import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import '../../styles/student_home.css';

export default function StudentHome() {
  return (
    <Layout>
      <Navbar screenSide='student' />
      <div className='card-container'>
        <div className="card">
          <img src="https://www.teachingenglish.org.uk/sites/teacheng/files/styles/wide/public/images/teens_and_exams_iStock_000005780399XSmall_0.jpg?itok=ElZYWt14" className="card-img-top" alt="Test preparation"/>
          <div className="card-body">
            <h5 className="card-title">Give Tests!</h5>
            <p className="card-text">Get stronger and prepare yourself for the final aptitude.</p>
            <Link to="/scheduled_tests" className="btn btn-primary">Give Tests</Link>
          </div>
        </div>
        <div className="card">
          <img src="https://img.paperform.co/fetch/f_jpg,w_1800/https://s3.amazonaws.com/paperform-blog/2020/12/How-To-Analyze-Survey-Results.png" className="card-img-top" alt="Result analysis"/>
          <div className="card-body">
            <h5 className="card-title">Analyze your Results!</h5>
            <p className="card-text">See where you lack and improve your performances.  </p>
            <Link to="/student_results" className="btn btn-primary">Check Scores</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
