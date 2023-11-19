const express = require('express'); 
const router = express.Router(); 
const multer = require('multer'); 
const MulterGoogleStorage = require('multer-google-storage'); 
const {listFiles, fileExists, createFile} = require('../gcloudBucket'); 
// const uploadFile = require('./uploadFunc')
const axios = require('axios');
const util = require('util');
const {exec} = require('child_process'); 

/*
- syllabus 
- quiz/exam 
- lecture notes 
*/

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

router.post('/fileBasic', upload.single('file'), async (req, res) => {
    //extension file not txt run OCR 
    //run vector embedding & store in vector db  
    //run scheduling -> store sample calendar 
    //check file type if not txt -> run OCR 
    console.log("uploadfmfgjfi")
    console.log(req)

    try {
        if (!req.file) {
            console.log("yeeffe")
            res.status(400).send("No File uploaded");
            return; 
        } 
        console.log(typeof req.file.mimetype); 
        const file = req.file.buffer; 
        const fileName = Date.now().toString() + req.file.originalname; 
        // dir, contype, fileName, data
        const dir = 'user-1/Subject/History/PDF/Documents/'
        console.log(dir);   
        console.log("feirgri")
    
        const success = await createFile(dir, req.file.mimetype, fileName, file)
        if (success) {
            res.status(200).send('File created successfully'); 
        } else {
            res.status(500).send('Failed to create file'); 
        }

    } catch (error) {
        console.log(error); 
        res.status(500).send('Internal server error'); 
    }
}); 

router.post('/fileSlides', upload.single('file'), async (req, res) => {

    //extension file not txt run OCR 

    //run vector embedding & store in vector db  
    //run scheduling -> store sample calendar 

    //check file type if not txt -> run OCR 

    try {
        if (!req.file) {
            res.status(400).send("No File uploaded"); 
            return; 
        } 
        
        console.log(typeof req.file.mimetype); 
        const file = req.file.buffer; 
        const fileName = Date.now().toString() + req.file.originalname; 
        // dir, contype, fileName, data
        console.log("hello");
        const dir = `${req.body.userId}/Subject/History/` 
        console.log(dir);   
    
        const success = await createFile(dir, req.file.mimetype, fileName, file)
        if (success) {
            // res.status(200).send('File created successfully'); 
            //run OCR 

        } else {
            res.status(500).send('Failed to create file'); 
        }
     

    } catch (error) {
        console.log(error); 
        res.status(500).send('Internal server error'); 
    }
}); 



router.post('/userInfo', async(req, res) => {
    console.log(req.body);
    const dir = `${req.body.userId}/` ;
    console.log("inserting user inf");

    // const fileExists = await fileExists(dir, 'info.json');
    try {
        const success = await createFile(dir, 'application/json', 'info', JSON.stringify(req.body, null, 2));

        if (success) {
            res.status(200).send('File created successfully'); 
        } else {
            res.status(500).send('Failed to create file'); 
        }
    } catch (error) {
        console.log(error); 
        res.status(500).send('Internal server error'); 
    }


});

router.post('/', (req, res) => {
    const cloudFunctionUrl = 'https://us-central1-studyarai.cloudfunctions.net/function-1'; 
    axios.post(cloudFunctionUrl, req)
    .then((response) => {
        console.log('Cloud Function Response:', response.data);
        // Process the response from the Cloud Function
        res.json(response.data); 
    })
    .catch((error) => {
        console.error('Error calling Cloud Function:', error);
        // Handle errors
    });
});

module.exports = router; 

// call OCR 




