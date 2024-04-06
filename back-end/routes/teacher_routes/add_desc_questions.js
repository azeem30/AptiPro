const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "WelcomeToAptiproPlacementWebApplication";
const { DescQuestion } = require('../../models/questionModels/questions');

const decodeToken = (token, secret) => {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

router.post('/add_desc_questions', 
async (req, res) => {
    try{
        const authToken = req.body.signedToken;
        originalToken = decodeToken(authToken, jwtSecret);
        const questionData = req.body.data;
        for(const {question, answer} of questionData){
            const descQuestion = new DescQuestion({
                question,
                answer
            });
            await descQuestion.save();
        }
        res.json({success: true});
    }
    catch(error){
        if(error.code === 11000){
            res.json({duplication: true, success: false});
        }
        res.json({success: false});
    }
});

module.exports = router;