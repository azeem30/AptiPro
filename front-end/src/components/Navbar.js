import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal';
import  '../styles/navbar.css'

export default function Navbar(props) {
  const [isConfirmationBoxVisible, setConfirmationBoxVisible] = useState(false);
  const iconStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
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
     <nav className="navbar navbar-expand-lg nav-style">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button onClick={handleHome} className="nav-link">
                Home
              </button>
            </li>
          </ul>
          <ul className="navbar-nav">
            {localStorage.getItem('authToken') && (
              <li className="nav-item">
                <button className="nav-link" onClick={openProfile}>
                  <img
                    className="rounded-circle"
                    style={iconStyle}
                    src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
                    alt="profile"
                  />
                </button>
              </li>
            )}
            {localStorage.getItem('authToken') && (
              <li className="nav-item">
                <button className="nav-link" onClick={openConfirmationBox}>
                  <img
                    className="rounded-circle"
                    style={iconStyle}
                    src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-logout-icon-png-image_956410.jpg"
                    alt="logout"
                  />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <ConfirmationModal isOpen={isConfirmationBoxVisible} onClose={closeConfirmationBox} onConfirm={handleLogout} test={null} purpose="Logout" />
    </nav>
  )
}
