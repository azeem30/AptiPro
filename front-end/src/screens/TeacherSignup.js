import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Layout from '../components/Layout'
import Alert from '../components/Alert';

export default function TeacherSignup() {
    const navigate = useNavigate();
    const [teacherData, setTeacherData] = useState({
        rollNo: '',
        name: '',
        email: '',
        password: '',
        departmentId: 0
    });
    const [message, setMessage] = useState({
      info: null,
      status: null
    });
    let signCardStyle = {
        position: 'relative',
        top: '4%'
    };
    let separator = {
      height: '0.5px',
      marginTop: '5px',
      marginBottom: '10px'
    };
    let departmentDropdownStyle = {
      marginTop: '30px',
      marginRight: '40px'
    };
    let signButtonStyle ={
      marginTop: '15px',
    };
    const registerTeacher = async (event) => {
      event.preventDefault();
      const response = await fetch('http://localhost:8000/api/teacher_signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({teacherData})
      });
      const data = await response.json();
      console.log(data);
      if(data.success){
        setMessage({...message, info: 'Registration Successful!', status: 'success'});
        navigate('/teacher_login');
      }else{
        setMessage({...message, info: data.message, status: 'danger'});
        navigate('/teacher_signup');
      }
    }
  return (
    <Layout>
        <form onSubmit={registerTeacher} className="container w-25 card border border-dark-subtle" style={signCardStyle}>
        <div className="card-body">
            <div className='d-flex justify-content-center'>
                <h4>Teacher Signup</h4>
            </div>
            <div style={separator} className='bg-secondary'></div>
            <div className="mb-3">
              <label htmlFor="teacherSignRoll" className='form-label'>Roll no.</label>
              <input type="text" id="tecaherSignRoll" onChange={(event)=>{setTeacherData({...teacherData, rollNo: event.target.value})}} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="teacherSignName" className='form-label'>Name</label>
              <input type="text" id="tecaherSignName" onChange={(event)=>{setTeacherData({...teacherData, name: event.target.value})}} className="form-control" required/>
            </div>
            <div className="mt-2 mb-3">
                <label htmlFor="teacherSignMail" className="form-label">Email</label>
                <input type="email" onChange={(event)=>{setTeacherData({...teacherData, email: event.target.value})}} className="form-control" id="teacherSignMail" required/>
                <p className='text-danger' id='teacher-email-error'></p>
            </div>
            <div className="mb-3">
                <label htmlFor="teacherSignPassword" className="form-label">Password</label>
                <input type="password" id="teacherSignPassword" onChange={(event)=>{setTeacherData({...teacherData, password: event.target.value})}} required className="form-control" aria-describedby="passwordHelpBlock"/>
                <p className='text-danger' id='teacher-password-error'></p>
            </div>
            <div className="dropdown mb-3" style={departmentDropdownStyle}>
              <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {teacherData.departmentId || 'Department'}
              </button>
              <ul className="dropdown-menu">
                <li><a id="cs" onClick={()=>{setTeacherData({...teacherData, departmentId: 1})}} className="dropdown-item">Computer Science</a></li>
                <li><a id="it" onClick={()=>{setTeacherData({...teacherData, departmentId: 5})}} className="dropdown-item">I.T.</a></li>
                <li><a id="elect" onClick={()=>{setTeacherData({...teacherData, departmentId: 4})}} className="dropdown-item">Electrical</a></li>
                <li><a id="extc" onClick={()=>{setTeacherData({...teacherData, departmentId: 3})}} className="dropdown-item">EXTC</a></li>
                <li><a id="mech" onClick={()=>{setTeacherData({...teacherData, departmentId: 2})}} className="dropdown-item">Mechanical</a></li>
              </ul>
            </div>
            <div className='bg-secondary' style={separator}></div>
            <div className="d-flex justify-content-center" style={signButtonStyle}>
                <button type="button" onClick={registerTeacher} className="btn btn-outline-success">Register</button>
            </div>
            <Alert info={message.info} status={message.status} />
        </div>
      </form>
    </Layout>
  )
}
