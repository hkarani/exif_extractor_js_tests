const fs = require('fs');
const path = require('path');
const base64 = require('base64-js');
const axios = require('axios');
const { error } = require('console');

async function extractExifData(url) {
    try{    

        const datavals = {
            "imageURL": url   
        }       

        // Send payload in a POST request locally
        axios.post('https://2rqb7rkfbynm2zqtee62ryhhwy0bwhod.lambda-url.us-east-1.on.aws/',datavals).
        then((resp) => {
                console.log(resp.data.body);

        })  
        
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

/**
 * Testing function calls
 */

// extractExifData('https://github.com/ianare/exif-samples/raw/master/tiff/Cr%C3%A9mieux11.tiff');
// extractExifData('https://github.com/ianare/exif-samples/raw/master/tiff/Picoawards.tiff');
// extractExifData('https://github.com/ianare/exif-samples/blob/master/jpg/gps/DSCN0027.jpg?raw=true');
extractExifData('https://github.com/ianare/exif-samples/raw/master/heic/mobile/HMD_Nokia_8.3_5G.heif');

