const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = "WelcomeToAptiproPlacementWebApplication";
const subject = require('../models/subjects');
const department = require('../models/departments');

const decodeToken = (token, secret) => {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

router.post('/subjects',
async (req, res) => {
    try{
        const authToken = req.body.signedToken;
        originalToken = decodeToken(authToken, jwtSecret);
        const departmentId = originalToken.userData.departmentId;
        const allSubjects = await subject.find({$or: [{departmentId}, {departmentId: 0}]});
        const departmentDetails = await department.findOne({departmentId});
        const departmentName = departmentDetails.departmentName;
        res.json({success: true, allSubjects, departmentName});
    }   
    catch(error){
        console.log(error);
        res.json({success: false});
    }
});

module.exports = router;