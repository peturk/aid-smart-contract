var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const fs = require('fs')

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('src'));
app.use(express.static('build/contracts'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/index.html', function (req, res) {
    res.send('Hello World!')
    console.log("Hello")
})

app.post('/process_post', urlencodedParser, function (req, res) {

    const stringifiedData = req.body.JSON_stringified

    const dataParsed = JSON.parse(stringifiedData)

    console.log(dataParsed)
    //fs.writeFileSync('src/disaster_areas.json', dataParsed);
    fs.writeFileSync('src/disaster_areas.json', JSON.stringify(dataParsed, null, 4));

    console.log(dataParsed)

    //const vindhradi = req.body.vindhradi

   // Prepare output in JSON format
  /*
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   */

   res.end(JSON.stringify({
       message: "File written",
       vindhradi: dataParsed[0].vindhradi,
   }));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})