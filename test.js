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
        axios.post('http://localhost:9000/2015-03-31/functions/function/invocations',datavals).
        then((resp) => {
                console.log(resp.data);

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
// extractExifData('https://github.com/ianare/exif-samples/raw/master/heic/mobile/HMD_Nokia_8.3_5G.heif');
extractExifData('https://i.pinimg.com/originals/d9/34/d0/d934d091874d26ef5db598178b12340a.jpg');
