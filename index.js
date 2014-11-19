var express = require('express')
var app = express();

var mongodb = require('mongodb')
, MongoClient = mongodb.MongoClient;

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  var domain = request.headers.host,
  subDomain = domain.split('.');

  if(subDomain.length > 2){
    subDomain = subDomain[0].split("-").join(" ");
    MongoClient.connect(process.env.MONGOHQ_URL, function(err, db) {
      // operate on the collection named "test"
      var collection = db.collection('people')
      collection.findOne({
        name: subDomain
      }, function(err, item) {
        if (item) {
          response.send('<h1 style="text-align:center">JA</h1>')
        }
        else {
          response.send('<h1 style="text-align:center">NEJ</h1>')
        }

      })
    })
  }else{
    subDomain = "Everyone ";
    response.send('Hello World!'+subDomain)
  }





})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
