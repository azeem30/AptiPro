import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Alert from "../../components/Alert";

export default function StudentSignup() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    rollNo: "",
    name: "",
    email: "",
    password: "",
    departmentId: 0,
    semester: 1,
    results: [
      { semester: 1, sgpi: "", cgpi: "", required: true },
      { semester: 2, sgpi: "", cgpi: "", required: true },
      { semester: 3, sgpi: "", cgpi: "", required: false },
      { semester: 4, sgpi: "", cgpi: "", required: false },
      { semester: 5, sgpi: "", cgpi: "", required: false },
      { semester: 6, sgpi: "", cgpi: "", required: false },
      { semester: 7, sgpi: "", cgpi: "", required: false },
      { semester: 8, sgpi: "", cgpi: "", required: false },
    ],
  });
  const [message, setMessage] = useState({
    info: null,
    status: null
  });
  let signCardStyle = {
    position: "relative",
    top: "4%",
  };
  let signButtonStyle = {
    marginTop: "30px",
  };
  let belowSeparator = {
    height: "0.5px",
    marginTop: "20px",
  };
  let aboveSeparator = {
    height: "0.5px",
    marginTop: "5px",
  };
  let departmentDropdownStyle = {
    marginTop: "30px",
    marginRight: "40px",
  };
  const calculateCGPI = (sgpi) => {
    return sgpi * 10;
  };
  const registerStudent = async (event) => {
    event.preventDefault();
    const response = await fetch("https://backend-sigma-beige.vercel.app/api/student_signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({studentData})
    });
    const data = await response.json();
    if(data.success){
      setMessage({...message, info: 'Registration Successful!', status: 'success'});
      navigate('/student_login');
    }
    else{
      setMessage({...message, info: data.message, status: 'danger'});
      navigate('/');
    }
  };
  return (
    <Layout>
      <form
        onSubmit={registerStudent}
        className="container w-25 card border border-dark-subtle"
        style={signCardStyle}
      >
        <div className="card-body">
          <div className="d-flex justify-content-center">
            <h4>Student Signup</h4>
          </div>
          <div className="border border-secondary" style={aboveSeparator}></div>
          <div className="mt-3 mb-3">
            <label for="studentSignName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentSignName"
              onChange={(event) => {
                setStudentData({...studentData, name: event.target.value});
              }}
              required
            />
          </div>
          <div className="mt-3 mb-3">
            <label for="studentSignMail" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="studentSignMail"
              placeholder="name@example.com"
              className="form-control"
              onChange={(event) => {
                setStudentData({...studentData, email: event.target.value});
              }}
              required
            />
            <p className="text-danger" id="email-error"></p>
          </div>
          <div className="mt-3 mb-3">
            <label for="studentSignRollNo" className="form-label">
              Roll No.
            </label>
            <input
              type="text"
              className="form-control"
              id="studentSignRollNo"
              onChange={(event) => {
                setStudentData({...studentData, rollNo: event.target.value});
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label for="studentSignPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="studentSignPassword"
              onChange={(event) => {
                setStudentData({...studentData, password: event.target.value});
              }}
              required
              className="form-control"
              aria-describedby="passwordHelpBlock"
            />
            <p className="text-danger" id="password-error"></p>
          </div>
          <div className="dropdown" style={departmentDropdownStyle}>
            <button
              className="btn btn-success dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {"Semester " + studentData.semester || "Semester"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  id="s3"
                  onClick={() => {
                    setStudentData({...studentData, semester: 3});
                  }}
                  className="dropdown-item"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  id="s4"
                  onClick={() => {
                    setStudentData({...studentData, semester: 4});
                  }}
                  className="dropdown-item"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  id="s5"
                  onClick={() => {
                    setStudentData({...studentData, semester: 5});
                  }}
                  className="dropdown-item"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  id="s6"
                  onClick={() => {
                    setStudentData({...studentData, semester: 6});
                  }}
                  className="dropdown-item"
                >
                  6
                </a>
              </li>
              <li>
                <a
                  id="s7"
                  onClick={() => {
                    setStudentData({...studentData, semester: 7});
                  }}
                  className="dropdown-item"
                >
                  7
                </a>
              </li>
              <li>
                <a
                  id="s8"
                  onClick={() => {
                    setStudentData({...studentData, semester: 8});
                  }}
                  className="dropdown-item"
                >
                  8
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown" style={departmentDropdownStyle}>
            <button
              className="btn btn-success dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {studentData.departmentId || "Department"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  id="cs"
                  onClick={() => {
                    setStudentData({...studentData, departmentId: 1})
                  }}
                  className="dropdown-item"
                >
                  Computer Science
                </a>
              </li>
              <li>
                <a
                  id="it"
                  onClick={() => {
                    setStudentData({...studentData, departmentId: 5})
                  }}
                  className="dropdown-item"
                >
                  I.T.
                </a>
              </li>
              <li>
                <a
                  id="elect"
                  onClick={() => {
                    setStudentData({...studentData, departmentId: 4})
                  }}
                  className="dropdown-item"
                >
                  Electrical
                </a>
              </li>
              <li>
                <a
                  id="extc"
                  onClick={() => {
                    setStudentData({...studentData, departmentId: 3})
                  }}
                  className="dropdown-item"
                >
                  EXTC
                </a>
              </li>
              <li>
                <a
                  id="mech"
                  onClick={() => {
                    setStudentData({...studentData, departmentId: 2})
                  }}
                  className="dropdown-item"
                >
                  Mechanical
                </a>
              </li>
            </ul>
          </div>
          <div className="border border-secondary" style={belowSeparator}></div>
          <div className="d-flex justify-content-center mt-4">
            <h4>Results</h4>
          </div>
          {studentData.results.map((result, index) => (
            <table className="table table-bordered border-dark-subtle">
              <tr className="mx-2" key={result.semester}>
                <th scope="row">{result.semester}</th>
                <td>
                  <input
                    className="form-control my-1 mx-1"
                    type="number"
                    aria-label={`Semester ${result.semester} SGPI`}
                    placeholder="SGPI"
                    value={result.sgpi}
                    onChange={(e) => {
                      const sgpi = parseFloat(e.target.value);
                      const cgpi = calculateCGPI(sgpi);
                      const updatedResults = [...studentData. results];
                      updatedResults[index] = {...result, sgpi, cgpi};
                      setStudentData({...studentData, results: updatedResults});
                    }}
                    required={result.required}
                  />
                </td>
                <td>
                  <input
                    className="form-control my-1 mx-1"
                    type="text"
                    aria-label={`Semester ${result.semester} CGPI`}
                    value={result.cgpi}
                    placeholder="CGPI"
                    readOnly
                  />
                </td>
              </tr>
            </table>
          ))}
          <div className="border border-secondary" style={belowSeparator}></div>
          <div
            className="d-flex justify-content-center"
            style={signButtonStyle}
          >
            <button type="submit" className="btn btn-outline-success">
              Register
            </button>
          </div>
          <p
            className={" d-flex justify-content-center mt-3"}
            id="registration-message"
          ></p>
          <Alert info={message.info} status={message.status} />
        </div>
      </form>
    </Layout>
  );
}
