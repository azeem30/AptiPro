const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "WelcomeToAptiproPlacementWebApplication";
const question = require(`../models/questionModels/questions`);

const decodeToken = (token, secret) => {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

const randomizeQuestions = (fetched) => {
    const randomArray = [...fetched];
    for(let i = randomArray.length - 1 ; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }
    return randomArray;
}

router.post('/fetch_questions',
async (req, res) => {
    try{
        const authToken = req.body.signedToken;
        originalToken = decodeToken(authToken, jwtSecret);
        const subjectFilter = req.body.testData.testSubject;
        const difficultyFilter = req.body.testData.testDifficulty;
        const questionCount = req.body.testData.testQuestionCount;
        let difficultyQuery = {};
        if(difficultyFilter == 'Easy' || difficultyFilter==='Medium' || difficultyFilter==='Hard'){
            difficultyQuery = {questionDifficulty: difficultyFilter};
        }
        const fetchedQuestions = await question.find({subjectName: subjectFilter, ...difficultyQuery}).limit(questionCount);
        const randomizedFetchedQuestions = randomizeQuestions(fetchedQuestions);
        res.json({success: true, randomizedFetchedQuestions});
    }
    catch(error){
        console.error(error);
        res.json({success: false});
    }
});

module.exports = router;