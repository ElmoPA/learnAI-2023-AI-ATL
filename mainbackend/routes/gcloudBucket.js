// Import the Google Cloud Storage library
const { Storage } = require('@google-cloud/storage');

// Name of the GCS bucket you want to access
const bucketName = 'user-main-database';

// Creates a client
const storage = new Storage();

const storageBucket = new Storage(bucketName); 

// List files in the bucket
async function listFiles(userId, subj, directoryPath) {
  try {
    const [files] = await storage.bucket(bucketName).getFiles({prefix: directoryPath});

    console.log('Files in Bucket:');
    files.forEach(file => {
      console.log(file.name);
    });
    return files;
    
  } catch (err) {
    console.error('Error listing files:', err);
  }
}

async function fileExists(directoryPath, fileName) {
  const [files] = await bucket.getFiles({
    prefix: directoryPath,
  });
  const fileExists = files.some(file => file.name === `${directoryPath}/${fileName}`);
  return fileExists;
}

async function createFile(dir, contype, fileName, data) {
  console.log("creating file yay"); 
  console.log(dir + fileName);
  const file = storage.bucket(bucketName).file(dir + fileName); 
  try {
      await file.save(data, {
      contentType: contype
      });
      return true;
  } catch (err) {
    console.error('Error creating JSON file in GCS:', err);
    return false; // Indicate failure
  }
}

async function getCalendarJson() {
  return new Promise((resolve, reject) => {
    const file = storage.bucket(bucketName).file('user-1/sample_calendar.json');
    const dataStream = file.createReadStream();

    let jsonData = '';

    dataStream
      .on('data', (chunk) => {
        // Accumulate data chunks
        jsonData += chunk;
      })
      .on('end', () => {
        try {
          const parsedData = JSON.parse(jsonData);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

module.exports = {listFiles, fileExists, createFile, getCalendarJson};  


