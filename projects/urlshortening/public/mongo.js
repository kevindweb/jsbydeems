var mongoose = require("mongoose"),
    connection,
    dbURI = 'mongodb://kevind:coding88@ds117849.mlab.com:17849/urlshortener',
    exports = module.exports,
    url = 'mongodb://localhost:27106/url',
    schema = require("./schema.js");

mongoose.connect(dbURI,function(err){
  if(err){
    mongoose.connect(url, function(err,db){
    	if(err){
    		console.log(err);
        connection = false;
        return;
    	} else{
        connection = true;
    		console.log("Connected to the local mongoDB server");
        return;
    	}
    });
  } else{
    connection = true;
    console.log('Connected to mlab');
    return;
  }
})

// setting up mongoose only if the connection to one of the servers succeeds
if(connection){
  // When successfully connected
  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
    connection = 'connected';
  });

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
    connection = 'error';
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
    connection = 'disconnected';
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination.');
      process.exit(0);
    });
  });
}

exports.initializeDatabase = function(callback){
  schema.myModel.find({},function(err,docs){
    if(err){
      callback(err);
    }
		if(docs===null||docs[0]===undefined){
			callback(null,'init');
		} else{
      callback(null,'no init');
		}
	});
}

exports.inputDocument = function(){
  new schema.myModel({
    _id : new mongoose.Types.ObjectId,
    url : "http://google.com",
    shortUrl : 1
  }).save(function(err,doc){
    if(err){
      console.log('Error inputting first doc');
    }
  });
}

exports.findFunction = function(url,callback){
  schema.myModel.find({url:url},function(err,docs){
    callback(err);
		if(docs===null||docs[0]===undefined){
			callback('There were no matching urls.',url);
		} else{
      callback(null,docs[0]);
		}
	});
}
exports.makeURL = function(url,shorturl,callback){
  new schema.myModel({
      _id : new mongoose.Types.ObjectId,
      url : url,
      shortUrl : shorturl+1
    }).save(function(err,docs){
      if(err){
        callback(err,null);
      } else{
        callback(null,docs);
      }
    });
}
exports.findLastShortUrl = function(callback){
  schema.myModel.find({shortUrl:{$exists:true}},function(err,docs){
    callback(err,docs[docs.length-1]);
  });
}
exports.findShortUrl = function(short,callback){
  schema.myModel.find({shortUrl:short},function(err,docs){
    if(err){
      callback(err);
    }
		if(docs===null||docs[0]===undefined){
			callback('There were no matching urls.');
		} else{
      callback(null,docs[0]);
		}
	});
}
