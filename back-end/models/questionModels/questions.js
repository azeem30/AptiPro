const mongoose = require('mongoose');
const {Schema} = mongoose;
const questionSchema = new Schema({
    questionId: {
        type: Number
    },
    questionText: {
        type: String
    },
    option1: {
        type: String
    },
    option2: {
        type: String
    },
    option3: {
        type: String
    },
    option4: {
        type: String
    },
    correctOption: {
        type: String
    },
    questionDiffuclty: {
        type: String
    },
    subjectId: {
        type: String
    },
    subjectName: {
        type: String
    }
});

module.exports = mongoose.model('questions', questionSchema);