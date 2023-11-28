const express = require('express');
const router = express.Router();
const testModel = require('../models/tests');
const jwt = require('jsonwebtoken');
const jwtSecret = "WelcomeToAptiproPlacementWebApplication";

const decodeToken = (token, secret) => {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

const generateTestId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueId += characters.charAt(randomIndex);
    }
    return uniqueId;
}

router.post('/create_test',
async(req, res) => {
    try{
        const {testId, testTitle, testMarks, testQuestionCount, testDuration, testDifficulty, testDate, testTime, testSubject} = req.body.test;
        const generatedId = generateTestId();
        const authToken = req.body.signedToken;
        const originalToken = decodeToken(authToken, jwtSecret);
        const teacherId = originalToken.userData.teacherId;
        await testModel.create({
            testId: generatedId,
            testTitle,
            testMarks,
            testQuestionCount,
            testDuration,
            testDifficulty,
            testDate,
            testTime,
            testSubject,
            testTeacher: teacherId
        });
        res.json({success: true});
    }
    catch(error){
        console.error(error);
        res.json({success: false});
    }
});

module.exports = router;