var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

var port = process.env.PORT || 5001;
app.listen(port);

console.log('Node Server listening at http://localhost:' + port);
