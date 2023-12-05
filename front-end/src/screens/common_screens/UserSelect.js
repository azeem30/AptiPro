import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import "../../styles/user_select.css"; // Import a CSS file for additional styling

export default function UserSelect() {
  return (
    <Layout>
      <Navbar />
      <div className="user-select-container">
        <div className="user-card">
          <img
            src="https://img.freepik.com/free-vector/college-university-students-group-young-happy-people-standing-isolated-white-background_575670-66.jpg?w=2000"
            className="card-img-top"
            alt="Student"
          />
          <div className="card-body">
            <Link to="/student_login" className="btn btn-success button btn-block">
              I am a Student
            </Link>
          </div>
        </div>
        <div className="user-card">
          <img
            src="https://img.freepik.com/free-vector/teacher-standing-near-blackboard-holding-stick-isolated-flat-vector-illustration-cartoon-woman-character-near-chalkboard-pointing-alphabet_74855-8600.jpg"
            className="card-img-top"
            alt="Teacher"
          />
          <div className="card-body">
            <Link to="/teacher_login" className="btn btn-success button btn-block">
              I am a Teacher
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
