import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

export default function UserSelect() {
  let linkStyle = {
    textDecoration: "none",
  };
  let imageLeftStyle = {
    borderBottom: "1px solid black",
  };
  let imageRightStyle = {
    borderBottom: "1px solid black",
    position: "relative",
    top: "48px",
  };
  let cardStyle = {
    width: "18rem",
    marginTop: "6%",
  };
  let buttonStyle = {
    marginTop: "45px",
  };
  return (
    <Layout>
      <Navbar />
        <div className="d-flex justify-content-center">
          <div class="card border border-dark-subtle mx-3" style={cardStyle}>
            <img
              style={imageLeftStyle}
              src="https://img.freepik.com/free-vector/college-university-students-group-young-happy-people-standing-isolated-white-background_575670-66.jpg?w=2000"
              class="card-img-top"
              alt="..."
            />
            <div class="d-flex justify-content-center card-body">
              <button class="btn btn-success">
                <Link
                  to="/student_login"
                  className="text-white"
                  style={linkStyle}
                >
                  I am a Student
                </Link>
              </button>
            </div>
          </div>
          <div class="card border border-dark-subtle" style={cardStyle}>
            <img
              src="https://img.freepik.com/free-vector/teacher-standing-near-blackboard-holding-stick-isolated-flat-vector-illustration-cartoon-woman-character-near-chalkboard-pointing-alphabet_74855-8600.jpg"
              class="card-img-top"
              alt="..."
            />
            <div style={imageRightStyle}></div>
            <div class="d-flex justify-content-center card-body">
              <button style={buttonStyle} class="btn btn-success">
                <Link
                  to="/teacher_login"
                  className="text-white"
                  style={linkStyle}
                >
                  I am a Teacher
                </Link>
              </button>
            </div>
          </div>
        </div>
    </Layout>
  );
}
