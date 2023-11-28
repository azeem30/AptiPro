const mongoose = require('mongoose');
const {Schema} = mongoose;
const departmentSchema = new Schema({
    departmentId:{
        type: Number,
        required: true
    },
    departmentName:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('departments', departmentSchema);