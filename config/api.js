/**
 * @Author: utkuglsvn <glsvn>
 * @Date:   2019-05-21T12:39:09+03:00
 * @Last modified by:   glsvn
 * @Last modified time: 2019-05-21T12:39:19+03:00
 */



var apiai = require('apiai');

// read the api.ai docs : https://api.ai/docs/

//Enter your API Key
var app = apiai('a055636b984d4117b64ed99a37e4c525');

// Function which returns speech from api.ai
var getRes = function(query) {
  var request = app.textRequest(query, {
      sessionId: '<unique session id>'
  });
const responseFromAPI = new Promise(
        function (resolve, reject) {
request.on('error', function(error) {
    reject(error);
});
request.on('response', function(response) {
  resolve(response.result.fulfillment.speech);
});
});
request.end();
return responseFromAPI;
};

// test the command :
//getRes('hello').then(function(res){console.log(res)});

module.exports = {getRes}
