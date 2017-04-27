var express = require('express');
var app = express();
var mongoose = require(__dirname+'/public/mongo.js');
var stuff = 'Complete';
var bodyParser = require("body-parser");

app.set('port', (process.env.PORT || 5001));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/filename')
});

// initialize Database
mongoose.initializeDatabase(function(err,data){
  if(err){
    console.log('There was an error');
    return;
  }
  if(data=='init'){
    mongoose.inputDocument();
    console.log('Input first document.')
    return;
  } else if(data=='no init'){
    console.log('Ok');
    return;
  }
});

app.get('/short/*',function(req,res){
  var short = req.params['0'];
  mongoose.findShortUrl(short,function(err,data){
    if(err=='There were no matching urls.'){
      return res.send('This url is not in the database');
    } else if(err){
      return res.send('There was a server error.');
    } else{
      var redirect = data.url;
      return res.redirect(redirect);
    }
  });
});

app.post('/postResponse',function(req,res){
  mongoose.findFunction(req.body['shortUrl[]'],function(err,item){
    if(err=='There were no matching urls.'){
      var shorturl;
      // find the last short url and increment by one for the next one
      mongoose.findLastShortUrl(function(err,myShorturl){
        if(err){
          console.log(err);
          res.send('Error Occurred');
          return;
        } else{
          shorturl = myShorturl.shortUrl;
          mongoose.makeURL(item,shorturl,function(err,result){
            if(err){
              console.log(err);
              res.send('Error Occurred');
              return;
            } else{
              var myItem = {};
              myItem.url = result.url;
              myItem.short = "http://fathomless-lake-15901.herokuapp.com/short/"+result.shortUrl;
              res.send(myItem);
              return;
            }
          });
        }
      });
      return;
    } else if(err){
      console.log(err);
      res.send('Error with database.');
      return;
    }
    if(item){
      var coolItem = {};
      coolItem.url = item.url;
      coolItem.short = "http://fathomless-lake-15901.herokuapp.com/short/"+item.shortUrl;
      res.send(coolItem);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
