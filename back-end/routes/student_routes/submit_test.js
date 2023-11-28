const express = require('express');
const router = express.Router();
const responseModel = require('../../models/responses');
const jwt = require('jsonwebtoken');
const jwtSecret = "WelcomeToAptiproPlacementWebApplication";

const decodeToken = (token, secret) => {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

router.post('/submit_test',
async (req, res) => {
    try{
        const {testId, testTitle, testMarks, testQuestionCount, testDuration, testDifficulty, testDate, testTime, testSubject, testTeacher} = req.body.testData;
        const selectedOptions = req.body.selectedOptions;
        const score = req.body.marksScored;
        const authToken = req.body.signedToken;
        const originalToken = decodeToken(authToken, jwtSecret);
        const student = originalToken.userData.studentId;
        await responseModel.create({
            responseId: testId,
            responseTitle: testTitle,
            responseData: selectedOptions,
            marksScored: score.toFixed(2),
            totalMarks: testMarks,
            percentage: (score / testMarks * 100).toFixed(2),
            difficulty: testDifficulty,
            responseSubject: testSubject,
            studentId: student,
            teacherId: testTeacher
        });
        res.json({success: true});
    }
    catch(error){
        console.error(error);
        res.json({success: false});
    }
});

module.exports = router;