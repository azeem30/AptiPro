const express = require('express');
const router = express.Router();
const teacher = require('../../models/teachers');
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9]).{8,}$/; 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "WelcomeToAptiproPlacementWebApplication";
router.post('/teacher_login', 
async (req, res)=>{
    try{
        const {email, password} = req.body.teacherCred;
        if(!emailPattern.test(email)){
            res.json({success: false, message: 'Invalid Email Format'});
        }
        else if(!passwordPattern.test(password)){
            res.json({success: false, message: 'The password should have a minimum length of 8 characters along with special characters.'});
        }
        const user = await teacher.findOne({email});
        if(!user){
            return res.status(400).json({error: 'Invalid Credentials'});
        }
        else{
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(passwordCompare){
                const data = {
                    userData : {
                        teacherId: user.email,
                        departmentId: user.departmentId
                    }
                }
                const authToken = jwt.sign(data, jwtSecret);
                res.json({success: true, authToken});
            }
            else{
                res.json({success: false, message: 'Invalid Credentials!'});
            }
        }
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: 'Login Failed! Invalid Credentials'});
    }
});

module.exports = router;