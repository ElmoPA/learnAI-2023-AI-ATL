const express = require('express'); 
const router = express.Router(); 
const listFiles = require('../gcloudBucket.js'); 
const axios = require('axios')
const {exec} = require('child_process'); 
const util = require('util');

// const exec = util.promisify(require('child_process').exec);

/*
request : 
- userId 
- subj
- flashcard = {
    {id, front , back}, 
    {id, front , back}, 
    {id, front , back}, 
}
*/

// send all as JSON file / send once 
router.get('/display', (req, res) => {
    console.log("hello");
    const {userId, subj} = req.query;
    // const path_topic = "user-1/";

    const pythonProcess = exec(`python pyfiles/fc.py topics.json`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing the Python script: ${error}`);
        res.status(500).send('Internal server error');
        return;
      } else {

        console.log(`Python script output:\n${stdout}`);
        res.send(stdout);

      }
    })
    
    // pythonProcess.stdin.end();
     // Send the response back to the client

    
  //   res.json({ "flashcards": [
  //     {
  //         "front": "Abraham Lincoln",
  //         "back": "16th President of the United States, opposed the expansion of slavery."
  //     },
  //     {
  //         "front": "Jefferson Davis",
  //         "back": "Jefferson Davis was President of the Confederate States of America."
  //     },
  //     {
  //         "front": "Robert E. Lee",
  //         "back": "Robert E. Lee was a Confederate general who was the commander of the Army of Northern Virginia."
  //     },
  //     {
  //         "front": "Ulysses S. Grant",
  //         "back": "Ulysses S. Grant was a Union general who led the Union to victory in the Civil War."
  //     },
  //     {
  //         "front": "William T. Sherman",
  //         "back": "William T. Sherman was a Union general who led the Union army to victory in the Battle of Atlanta."
  //     },
  //     {
  //         "front": "The Civil War",
  //         "back": "1861-1865 The bloodiest war in American history, led to passage of the Thirteenth, Fourteenth, and Fifteenth Amendments to the United States Constitution."
  //     },
  //     {
  //         "front": "",
  //         "back": "April 12, 1861 First shots of the Civil War were fired at Fort Sumter."
  //     },
  //     {
  //         "front": "Battle of Fredericksburg",
  //         "back": "December 13, 1862, Union General Ambrose Burnside led a march on Richmond, but was delayed for more than two weeks because of late-arriving supplies."
  //     },
  //     {
  //         "front": "The Gettysburg Address",
  //         "back": "November 19, 1863, dedication of Soldier's National Cemetery in Gettysburg, Pennsylvania."
  //     },
  //     {
  //         "front": "First Battle of Bull Run",
  //         "back": "July 21, 1861, first major battle of the Civil War"
  //     },
  //     {
  //         "front": "Sherman's March to the Sea",
  //         "back": "November 15-December 20, 1864, Sherman's March to the Sea was a key event in the Civil War."
  //     }
  // ]})
   
});


module.exports = router;








