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

const descQuestionSchema = new Schema({
    question : {
        type: String,
        required: true,
        unique: true
    },
    answer : {
        type: String,
        required: true,
        unique: true
    }
    ,
    context : {
        type: String,
    }
});

const Question = mongoose.model('questions', questionSchema);
const DescQuestion = mongoose.model('descQuestions', descQuestionSchema);

module.exports = { Question, DescQuestion };