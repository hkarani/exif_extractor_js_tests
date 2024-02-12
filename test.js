const fs = require('fs');
const path = require('path');
const base64 = require('base64-js');
const axios = require('axios');
const { error } = require('console');

async function extractExifData(filePath) {
    try{
        // Read the image file
        const imageBinaryData = fs.readFileSync(filePath);

        // Convert binary data to base64
        const base64Data = base64.fromByteArray(imageBinaryData);

        // Convert to Data URI
        const dataUri = `data:image/jpeg;base64,${base64Data}`;

        // Get the file name
        const fileName = path.basename(filePath);

        const datavals = {
                "fileName": fileName,
                "image": dataUri              

        }

        // Testing deployed lambda here
        axios.post('https://osyseixnxqtiou464ibqy7bgmm0sgckc.lambda-url.us-east-1.on.aws/',datavals).
        then((resp) => {
                console.log(resp.data);

        })
        

        // Send payload in a POST request locally
        // axios.post('http://localhost:9000/2015-03-31/functions/function/invocations',datavals).
        // then((resp) => {
        //         console.log(resp.data);

        // })
        

       
        
        
        
        // return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

/**
 * Testing function calls
 */

// extractExifData('pics/Crémieux11.tiff');
// extractExifData('pics/HMD_Nokia_8.3_5G.heif');
//Jobagent.tiff will throw error it also thows error on jimpl
// extractExifData('pics/Jobagent.tiff');
// extractExifData('pics/WWL_(Polaroid)_ION230.jpg');
extractExifData('pics/DSCN0010.jpg');
