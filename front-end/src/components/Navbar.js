import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal';

export default function Navbar(props) {
  const [isConfirmationBoxVisible, setConfirmationBoxVisible] = useState(false);
    let imageStyle = {
        width: '30px',
        height: '30px'
    };
    let profileStyle = {
        marginLeft: '1260px'
    };
    let navStyle = {
        borderBottom: '0.5px solid black'
    };
    const navigate = useNavigate();
    const openConfirmationBox = () => {
        setConfirmationBoxVisible(true);
    };
    const closeConfirmationBox = () => {
        setConfirmationBoxVisible(false);
    };
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/');
    };
    const handleHome = () => {
      if(props.screenSide === 'student'){
        navigate('/student_home');
      }
      else if(props.screenSide === 'teacher'){
        navigate('/teacher_home');
      }
      else{
        navigate('/');
      }
    };
    const openProfile = () => {
      navigate(`/profile?side=${props.screenSide}`);
    }
    return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success opacity-75" style={navStyle}>
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            AptiPro
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item my-2">
                <button onClick={handleHome} className="nav-link active text-white" aria-current="page">
                  Home
                </button>
              </li>
              {
                localStorage.getItem("authToken") ? (
                  <li style={profileStyle} className="nav-item my-1">
                    <button className="nav-link" onClick={openProfile}>
                      <img className='rounded' style={imageStyle} src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg" alt="profile" />
                    </button>
                  </li>
                ) : ''
              }
              { 
                localStorage.getItem("authToken") ? ( 
                  <li className="nav-item my-1">
                    <button className="nav-link" onClick={openConfirmationBox}>
                      <img className='rounded' style={imageStyle} src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-logout-icon-png-image_956410.jpg" alt="logout" />
                    </button>
                  </li>
                ) : ''
              }
            </ul>
          </div>
        </div>
      </nav>
      <ConfirmationModal isOpen={isConfirmationBoxVisible} onClose={closeConfirmationBox} onConfirm={handleLogout} test={null} purpose='Logout' />
    </div>
  )
}
