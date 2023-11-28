const express = require('express');
const router = express.Router();
const response = require('../models/responses');
const student = require('../models/students');
const jwt = require("jsonwebtoken");
const jwtSecret = "WelcomeToAptiproPlacementWebApplication";

const decodeToken = (token, secret) => {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

router.post('/fetch_responses',
async (req, res) => {
    try{
        const authToken = req.body.signedToken;
        originalToken = decodeToken(authToken, jwtSecret);
        if(originalToken.userData.studentId){
            const studentId = originalToken.userData.studentId;
            const results = await response.find({studentId});
            res.json({success: true, results});
        }
        else if(originalToken.userData.teacherId){
            const teacherId = originalToken.userData.teacherId;
            const results = await response.find({teacherId});
            const studentIds = [...new Set(results.map((result) => result.studentId))];
            const studentInfo = await student.find({email: {$in: studentIds}});
            const combinedResults = results.map((result) => {
                const matchingStudent = studentInfo.find((student) => student.email === result.studentId);
                if(matchingStudent){
                    return {
                    responseId: result.responseId,
                    responseData: result.responseData,
                    responseTitle: result.responseTitle,
                    difficulty: result.difficulty,
                    totalMarks: result.totalMarks,
                    marksScored: result.marksScored,
                    percentage: result.percentage,
                    responseSubject: result.responseSubject,
                    studentId: result.studentId,
                    teacherId: result.teacherId,
                    email: result.studentId, 
                    name: matchingStudent.name,
                    rollNo: matchingStudent.rollNo,
                    password: matchingStudent.password,
                    semester: matchingStudent.semester,
                    departmentId: matchingStudent.departmentId
                    };
                }
                return null;
            }).filter(Boolean);
            res.json({success: true, combinedResults});
        }
    }
    catch(error){
        res.json({success: false});
    }
});

module.exports = router;