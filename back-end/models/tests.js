const mongoose = require('mongoose');
const {Schema} = mongoose;
const testSchema = new Schema({
    testId: {
        type: String,
        required: true
    },
    testTitle: {
        type: String,
        required: true
    },
    testMarks: {
        type: Number,
        required: true
    },
    testQuestionCount: {
        type: Number
    },
    testDuration: {
        type: Number,
        required: true
    },
    testDifficulty: {
        type: String,
        required: true
    },
    testDate: {
        type: String,
        required: true
    },
    testTime: {
        type: String,
        required: true
    },
    testSubject: {
        type: String,
        required: true
    },
    testTeacher: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('tests', testSchema);