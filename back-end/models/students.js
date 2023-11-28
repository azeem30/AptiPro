const mongoose = require('mongoose');
const {Schema} = mongoose;
const studentSchema = new Schema({
    rollNo: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    departmentId: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    results: {
        type: Array,
        required: true
    }
});
module.exports = mongoose.model('students', studentSchema);