const express = require('express');
const router = express.Router();
const student = require('../../models/students');
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9]).{8,}$/; 
const bcrypt = require('bcryptjs');

router.post('/student_signup',
async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        if(!emailPattern.test(req.body.studentData.email)){
            res.json({success: false, message: 'Invalid Email Format'});
        }
        else if(!passwordPattern.test(req.body.studentData.password)){
            res.json({success: false, message: 'The password should have a minimum length of 8 characters along with special characters.'});
        }
        const encryptedPassword = await bcrypt.hash(req.body.studentData.password, salt);
        await student.create({
            rollNo: req.body.studentData.rollNo,
            name: req.body.studentData.name,
            email: req.body.studentData.email,
            password: encryptedPassword,
            departmentId: req.body.studentData.departmentId,
            semester: req.body.studentData.semester,
            results: req.body.studentData.results
        });
        res.json({success: true});
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: 'Registration Failed! Retry'});
    }
});
module.exports = router;