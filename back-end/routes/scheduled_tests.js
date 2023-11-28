const express = require('express');
const router = express.Router();
const test = require('../models/tests');
const response = require('../models/responses');
const subject = require('../models/subjects');
const jwt = require('jsonwebtoken');
const jwtSecret = "WelcomeToAptiproPlacementWebApplication";

const decodeToken = (token, secret) => {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

router.post('/scheduled_tests',
async (req, res) => {
    try{
        const authToken = req.body.signedToken;
        originalToken = decodeToken(authToken, jwtSecret);
        const departmentId = originalToken.userData.departmentId;
        const studentId = originalToken.userData.studentId;
        const allSubjects =  await subject.find({departmentId});
        const subjectNames = allSubjects.map((sub) => sub.subjectName);
        let scheduledTests = await test.find({ testSubject: { $in: subjectNames } });
        const allResponses = await response.find({studentId});
        const responseIds = allResponses.map((response) => response.responseId);
        scheduledTests = scheduledTests.filter((scheduledTest) => {
            return !responseIds.includes(scheduledTest.testId);
        });
        res.json({success: true, scheduledTests});
    }
    catch(error){
        console.error(error);
        res.json({success: false});
    }
});

module.exports = router;