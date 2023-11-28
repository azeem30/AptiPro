const mongoose = require('mongoose');
const {Schema} = mongoose;
const teacherSchema = new Schema({
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
    }
});
module.exports = mongoose.model('teachers', teacherSchema);