var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var core = require('./core');
core.init();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));
console.debugging=false;
console.debug = function() {
  if(!console.debugging) return;
  console.log.apply(this, arguments);
};

function getProperty(propertyName,data){
  var value = {};
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      console.debug('KEY:',key)
      var element = data[key];
      if(key.startsWith(propertyName)){
        
        var extract_key = key.match(/\[(.*)\]/).pop();
        value [extract_key]=element;
      }
    }
  }
  console.debug('VALUE of',propertyName,value);
  return value.isEmpty()?null:value;
}
/**Not needed */
app.post('/post', function (req, resp) {
    
    var data = req.body;
    var headers = getProperty('headers',data);
    var data_body = getProperty('body',data);

    
    console.debug('DATA:',data);
    const options = {
        url: data.url,
        headers: headers,
      };
      if(data_body!=null){
        options.body=JSON.stringify(data_body);
      }
      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          resp.send(body);
        }
        else {
        console.error(error,body);
        resp.send(error);}
        
      }
      console.debug('OPTIONS',options);
      request.post(options, callback);
});

app.listen('3000');
console.log('working on 3000');