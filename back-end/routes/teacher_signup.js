const express = require('express');
const router = express.Router();
const teacher = require('../models/teachers');
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9]).{8,}$/; 
const bcrypt = require('bcryptjs');

router.post('/teacher_signup', 
async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        if(!emailPattern.test(req.body.teacherData.email)){
            res.json({success: false, message: 'Invalid Email Format'});
        }
        else if(!passwordPattern.test(req.body.teacherData.password)){
            res.json({success: false, message: 'The password should have a minimum length of 8 characters along with special characters.'});
        }
        const encryptedPassword = await bcrypt.hash(req.body.teacherData.password, salt);
       await teacher.create({
            rollNo: req.body.teacherData.rollNo,
            name: req.body.teacherData.name,
            email: req.body.teacherData.email,
            password: encryptedPassword,
            departmentId: req.body.teacherData.departmentId
        });
        res.json({success: true});
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: 'Registration Failed! Retry'});
    }
});

module.exports = router;