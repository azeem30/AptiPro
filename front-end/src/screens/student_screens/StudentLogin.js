import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Alert from '../../components/Alert';
import '../../styles/student_login.css'; 

export default function StudentLogin() {
  const navigate = useNavigate();
  const [studentCred, setStudentCred] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({
    info: null,
    status: null
  });

  const loginStudent = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8000/api/student_login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ studentCred })
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('authToken', data.authToken);
      setMessage({ ...message, info: 'Login Successful!', status: 'success' });
      navigate('/student_home');
    } else {
      setMessage({ ...message, info: data.message, status: 'danger' });
      navigate('/student_login');
    }
  }

  return (
    <Layout>
      <form onSubmit={loginStudent} className="login-form">
        <div className="card-body">
          <h4 className='text-center mb-4'>Student Login</h4>
          <hr className='separator'/>
          <div className='form-group'>
            <label htmlFor="exampleFormControlInputSt">Email</label>
            <input type="email" onChange={(event) => { setStudentCred({ ...studentCred, email: event.target.value }) }} className="form-control" id="exampleFormControlInputSt" placeholder="name@example.com" />
            <p className='text-danger' id='email-validation'></p>
          </div>
          <div className="form-group">
            <label htmlFor="inputPasswordSt">Password</label>
            <input type="password" onChange={(event) => { setStudentCred({ ...studentCred, password: event.target.value }) }} id="inputPasswordSt" className="form-control" aria-describedby="passwordHelpBlock" />
            <p className='text-danger' id='password-validation'></p>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-info mt-3">Login</button>
            <p className='mt-2' id='login-message'></p>
          </div>
          <div className='border-bottom mt-4'></div>
          <div className='text-center mt-3'>
            <p className='fw-semibold extra-text'>New Student? <Link className='nav-item' to='/student_signup'>Signup</Link></p>
          </div>
          <Alert info={message.info} status={message.status} />
        </div>
      </form>
    </Layout>
  )
}
