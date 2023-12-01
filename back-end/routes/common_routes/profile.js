const express = require('express');
const router = express.Router();
const student = require('../../models/students');
const teacher = require('../../models/teachers');
const department = require('../../models/departments');
const jwt = require('jsonwebtoken');
const jwtSecret = "WelcomeToAptiproPlacementWebApplication";

const decodeToken = (token, secret) => {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

router.post('/profile',
async (req, res) => {
    try{
        const authToken = req.body.signedToken;
        originalToken = decodeToken(authToken, jwtSecret);
        if(originalToken.userData.studentId){
            const studentId = originalToken.userData.studentId;
            const departmentId = originalToken.userData.departmentId;
            const profileInfo = await student.findOne({email: studentId});
            const departmentDetails = await department.findOne({departmentId});
            res.json({success: true, profileInfo, departmentDetails});
        }
        else if(originalToken.userData.teacherId){
            const teacherId = originalToken.userData.teacherId;
            const departmentId = originalToken.userData.departmentId;
            const profileInfo = await teacher.findOne({email: teacherId});
            const departmentDetails = await department.findOne({departmentId});
            res.json({success: true, profileInfo, departmentDetails});
        }
    }catch(error){
        res.json({success: false});
    }
});

module.exports = router;