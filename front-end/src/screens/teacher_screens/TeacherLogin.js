import React, {useState} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import Layout from '../../components/Layout'
import Alert from '../../components/Alert';

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
    let logCardStyle = {
        position: 'relative',
        top: '6%'
    };
    let logButtonStyle ={
        marginTop: '30px',
    };
    let extraTextStyle = {
        marginBottom: '0px',
        marginTop: '10px'
    };
    let belowSeparator={
        height:'0.5px',
        marginTop: '20px'
    };
    let aboveSeparator={
        height:'0.5px',
        marginTop: '5px'
    };
    const loginTeacher = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8000/api/teacher_login", {
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
        <form onSubmit={loginTeacher} className="container w-25 card border border-dark-subtle" style={logCardStyle}>
        <div className="card-body">
            <div className='d-flex justify-content-center'>
                <h4>Teacher Login</h4>
            </div>
            <div className='border border-secondary' style={aboveSeparator}></div>
            <div className="mt-3 mb-3">
                <label for="exampleFormControlInputTc" className="form-label">Email</label>
                <input type="email" onChange={(event)=>{setTeacherCred({...teacherCred, email: event.target.value})}} className="form-control" id="exampleFormControlInputSt" placeholder="name@example.com"/>
                <p class='text-danger' id='email-validation'></p>
            </div>
            <div className="mb-3">
                <label for="inputPasswordTc" className="form-label">Password</label>
                <input type="password" onChange={(event)=>{setTeacherCred({...teacherCred, password: event.target.value})}} id="inputPasswordSt" className="form-control" aria-describedby="passwordHelpBlock"/>
                <p class='text-danger' id='password-validation'></p>           
            </div>
            <div className="d-flex justify-content-center" style={logButtonStyle}>
                <button type="submit" class="btn btn-info  border border-primary">Login</button>
            </div>
            <p class={'d-flex justify-content-center mt-2'} id='login-message'></p>
            <div className='border border-secondary' style={belowSeparator}></div>
            <div className='d-flex justify-content-center'>
                <p className='fw-semibold' style={extraTextStyle}>New Teacher? <Link className='nav-item' to='/teacher_signup'>Signup</Link></p>
            </div>
            <Alert info={message.info} status={message.status} />
        </div>
    </form>
    </Layout>
  )
}
