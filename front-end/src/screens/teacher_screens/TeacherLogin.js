import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Alert from '../../components/Alert';
import '../../styles/teacher_styles/teacher_login.css'; 

export default function TeacherLogin() {
    const navigate = useNavigate();
    const [teacherCred, setTeacherCred] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({
        info: null,
        status: null
    });

    const loginTeacher = async (event) => {
        event.preventDefault();
        const response = await fetch("https://backend-sigma-beige.vercel.app/api/teacher_login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({teacherCred})
        });
        const data = await response.json();
        console.log(data);
        if(data.success){
            localStorage.setItem('authToken', data.authToken);
            setMessage({...message, info: 'Login Successful!', status: 'success'});
            navigate('/teacher_home');
        }
        else{
            setMessage({...message, info: data.message, status: 'danger'});
            navigate('/teacher_login');
        }
    }

    return (
        <Layout>
            <form onSubmit={loginTeacher} className="login-form">
                <div className="card-body">
                    <div className='form-header'>
                        <h4>Teacher Login</h4>
                    </div>
                    <hr className='separator'/>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInputTc" className="form-label">Email</label>
                        <input type="email" onChange={(event) => setTeacherCred({...teacherCred, email: event.target.value})} className="form-control" id="exampleFormControlInputSt" placeholder="name@example.com" />
                        {/* Add any email validation message */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPasswordTc" className="form-label">Password</label>
                        <input type="password" onChange={(event) => setTeacherCred({...teacherCred, password: event.target.value})} id="inputPasswordSt" className="form-control" aria-describedby="passwordHelpBlock" />
                        {/* Add any password validation message */}
                    </div>
                    <div className="form-group d-flex justify-content-center">
                        <button type="submit" className="btn btn-info">Login</button>
                    </div>
                    <p className='login-message'></p>
                    <hr className='separator'/>
                    <div className='form-footer'>
                        <p className='extra-text'>New Teacher? <Link className='nav-item' to='/teacher_signup'>Signup</Link></p>
                    </div>
                    <Alert info={message.info} status={message.status} />
                </div>
            </form>
        </Layout>
    )
}
