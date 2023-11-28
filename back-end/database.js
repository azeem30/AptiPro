const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://azeem:Azeem123@cluster0.cn88yxf.mongodb.net/aptiprodb?retryWrites=true&w=majority'
const connectToDatabase = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to database Successfully!");
}
module.exports = connectToDatabase;

