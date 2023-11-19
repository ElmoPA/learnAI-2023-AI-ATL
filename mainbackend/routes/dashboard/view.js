const express = require('express'); 
const router = express.Router(); 
const util = require('util');

const {exec} = require('child_process'); 

const {listFiles, fileExists, createFile, getCalendarJson} = require('../gcloudBucket')


router.get('/calendar', async (req, res) => {
    try {
      console.log("HELLO");
      const mlRes = '{}'; // Process schedule or other logic if needed 


      const pythonProcess = exec(`python pyfiles/scheduling_rec.py`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing the Python script: ${error}`);
          res.status(500).send('Internal server error');
          return;
        }
        //stdout as json calendar
        console.log(`Python script output:\n${stdout}`);

        

        res.send(stdout); // Send the response back to the client

      });

    //   const cal = await getCalendarJson(); // Await the asynchronous function to get the calendar data
    //   res.json(cal); // Send the response when cal data is available
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

 
router.get('/', (req, res) => {
//get stats and display stats 
})

//when press a subject 
router.get('/subject', async (req, res) => {
    const { userId, subj } = req.query;
    const cal = await getCalendarJson();
    
    // Initialize arrays
    let flashcards = [];
    let quiz = [];

    // Get current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for precise comparison

    // Get date 2 days from now
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 4);
    futureDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for precise comparison

    // Define a regular expression pattern to match words: Quiz, Flashcards, or Review
    const regex = /\b(?:Quiz|Review|Flashcards)\b/gi;

    // Filter elements within the date range (today to 2 days from now) and with specified words in title
    cal.forEach((elem) => {
        const eventDate = new Date(elem.start);
        eventDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for precise comparison

        if (eventDate >= currentDate && eventDate <= futureDate && regex.test(elem.title)) {
            if (elem.title.match(/\bQuiz\b/gi)) {
                quiz.push(elem.title);
            } else if (elem.title.match(/\bFlashcards\b/gi)){
                flashcards.push(elem.title);
            }
        }
    });
    console.log(flashcards);
    console.log(quiz); 
    // Create the output data object
    const data = {
        "Quiz": quiz,
        "Flashcards": flashcards, 
        "Calendar": cal 
    };

    // Send the response
    res.send(data);
});

module.exports = router; 