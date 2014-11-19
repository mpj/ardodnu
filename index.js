var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  var domain = request.headers.host,
  subDomain = domain.split('.');

  if(subDomain.length > 2){
    subDomain = subDomain[0].split("-").join(" ");
  }else{
    subDomain = "Everyone ";
  }
  response.send('Hello World!'+subDomain)
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
