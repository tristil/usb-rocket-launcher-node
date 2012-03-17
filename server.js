var express = require('express');

app = express.createServer();

app.get('/', function(request, response)
{
  response.send("Hello World\n");
}
);

app.listen(80);
