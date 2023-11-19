const express = require('express'); 
  
const app = express(); 
const PORT = process.env.PORT || 3030;
const pool = require('./dbconfig')
const bodyParser = require('body-parser'); 
// const session = require('express-session');
const cors = require('cors')

app.use(cors());

// const listFiles = require('/gcloudBucket.js')

const connection = require('./dbconfig');
app.use(bodyParser.json()); 

// const mainRouter = require('./routes/index'); 
const uploadRouter = require('./routes/upload/stuff'); 
const quizRouter = require('./routes/quiz/displayQuiz');
const flashcardRouter = require('./routes/flashcards/displayFlash'); 
const dashboardRouter = require('./routes/dashboard/view'); 

// const uploadRouter = require('./routes/upload/stuff'); 

// app.use(bodyParser.urlencoded({ extended: false }));
app.use('/quiz', quizRouter); 
app.use('/upload', uploadRouter);
app.use('/flashcard', flashcardRouter);
app.use('/dashboard', dashboardRouter);

function populateSchedule() {
    // topics 
    console.log("yep")
    app.set('sessionStarted', true); 

    // run schedule function -> get sample 

}

// app.use((req,res,next) => {
//     if (!req.session.started) {
//         populateSchedule(); 
//         req.session.started = true; 
//     }

// }) 





app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,  and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 