const mongoose = require('mongoose');
const {Schema} = mongoose;

const responseSchema = new Schema({
    responseId:{
        type: String,
        required: true
    },
    responseTitle: {
        type: String,
    },
    responseData: {
        type: Array
    },
    marksScored: {
        type: Number
    },
    totalMarks:{
        type: Number
    },
    percentage: {
        type: Number
    },
    difficulty: {
        type: String
    },
    responseSubject: {
        type: String
    },
    studentId: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('responses', responseSchema);