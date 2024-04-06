const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "WelcomeToAptiproPlacementWebApplication";
const { Question } = require(`../../models/questionModels/questions`);

const decodeToken = (token, secret) => {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

router.post('/add_questions',
async (req, res) => {
    try{
        const authToken = req.body.signedToken;
        originalToken = decodeToken(authToken, jwtSecret);
        const randomInteger = Math.floor(Math.random() * 10);
        await Question.create({
            questionId: randomInteger,
            questionText: req.body.questionData.questionText,
            option1: req.body.questionData.option1,
            option2: req.body.questionData.option2,
            option3: req.body.questionData.option3,
            option4: req.body.questionData.option4,
            correctOption: req.body.questionData.correctOption,
            questionDifficulty: req.body.questionData.questionDifficulty,
            subjectId: req.body.questionData.subjectId,
            subjectName: req.body.questionData.subjectName
        });
        res.json({success: true});
    }
    catch(error){
        res.json({success: false});
    }
});

module.exports = router;