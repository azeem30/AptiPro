import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Alert from '../../components/Alert'
import Profile from '../../components/Profile';

export default function ProfilePage() {
    useEffect(() => {
        getProfile();
    }, []);
    const [profile, setProfile] = useState({});
    const [departmentDetails, setDepartmentDetails] = useState({});
    const [message, setMessage] = useState({
        info: null,
        status: null
    });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sideData = queryParams.get('side');
    var signedToken = localStorage.getItem('authToken');
    const getProfile = async () => {
        const response = await fetch("https://back-end-rosy-five.vercel.app/api/profile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({signedToken})
        });
        const data = await response.json();
        if(data.success){
            setProfile(data.profileInfo);
            setDepartmentDetails(data.departmentDetails);
        }
        else{
            setMessage({...message, info: 'Failed to fetch profile', status: 'danger'});
        }
    };
  return (
    <Layout>
        <Navbar screenSide={sideData} />
        <Alert info={message.info} status={message.status} />
        <Profile data={profile} side={sideData} department={departmentDetails}/>
    </Layout>
  )
}
