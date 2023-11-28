const mongoose = require('mongoose');
const {Schema} = mongoose;
const subjectSchema = new Schema({
    subjectId: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    departmentId: {
        type: Number, 
        required: true
    }
});
module.exports = mongoose.model('subjects', subjectSchema);