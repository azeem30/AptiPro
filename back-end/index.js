const express = require('express')
const connectToDatabase = require('./database')
const app = express();
const port = 8000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

app.use('/api', require("./routes/teacher_signup"));
app.use('/api', require("./routes/teacher_login"));
app.use('/api', require("./routes/student_signup"));
app.use('/api', require("./routes/student_login"));
app.use('/api', require("./routes/subjects"));
app.use('/api', require("./routes/create_test"));
app.use('/api', require("./routes/scheduled_tests"));
app.use('/api', require("./routes/fetch_questions"));
app.use('/api', require("./routes/submit_test"));
app.use('/api', require("./routes/fetch_responses"));
app.use('/api', require("./routes/add_questions"));

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});
connectToDatabase();