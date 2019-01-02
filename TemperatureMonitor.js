/**
* TemperatureMonitor.js
* This is a Node.js server that visits a Particle variable to read the
* temperature on a particular Photon.
*
* It makes a REST request to the Photon's digital twin to check the temperature.
* Visit this service with localhost:1337
* Text is returned to the browser.
*/

// We need to use https to visit Particle.
var https = require('https');

// This web site uses plain http.
var http = require('http');

// Create a server with an annonymous call back
http.createServer(function(req,res) {

  // Return if this is a request for a favorite icon.
  // We are not serving a favorite icon.
  if(req.url == '/favicon.ico') return;

  // Identify the Photon at Particle with a device ID.
  // Authorize the visit with an access code.
  // The name of the variable we are interesed in is tempVar.
  // The name of the variable on the device may be different but is mapped to tempVar.
  https.get('https://api.particle.io/v1/devices/DEVICE_ID_GOES_HERE/tempVar?access_token=ACCESS_CODE_GOES_HERE',
  (resp) => {
        let data = '';
        // A chunk of data has been recieved and builds up.
        resp.on('data', (chunk) => {
           data += chunk;
        });

        // The whole response has been received. Print out the result.
        // And send back the temperature to the browser.
        resp.on('end', () => {
           console.log('Got response from Particle');
           console.log(JSON.parse(data).result);
           let textToBrowser = JSON.parse(data).result.toString();
           res.writeHead(200, {'Content-type' : 'text/plain'});
           res.end(textToBrowser);
        });

    }).on("error", (err) => {
            console.log("Error: " + err.message);
    })
}).listen(1337);
