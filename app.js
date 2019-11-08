var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerDoc = require('./Controller/Swagger'); 
const jwt = require('jsonwebtoken');


var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');



var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// api to get Token only 
app.get('/jwt', (req, res) => {
  let token = jwt.sign({ "body": "stuff" }, "MySuperSecretPassPhrase", {expiresIn: '1h'});
  res.status(200).send({ auth: true, token: token });
});

// api to get index or starting page
app.use('/', checkTokens,indexRouter);

// all apis of students will hit from this router
app.use('/students',checkTokens,studentsRouter);


swaggerDoc(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// this function is to verify the token and will refresh the token on expiring 
function checkTokens (req,res,next){

  //get Token from request
  let token = req.headers.authorization.split(' ')[1];
  console.log("Token is " + token);
  // if there token is empty or null 
  if (!token){
   return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  // verify token , token is valid , expired or not 
  // if token is expired , refresh token and send it to client
  jwt.verify(token, "MySuperSecretPassPhrase" , function(err, decoded) {
    
     if (err) {
      console.log("Error is ",JSON.stringify (err));
      if(JSON.parse (JSON.stringify (err))["message"] ==="jwt expired")
      {
        // refresh token
        let token = jwt.sign({ "body": "stuff" }, "MySuperSecretPassPhrase", {expiresIn: '1h'});
        console.log("New Token is ", token);
        // send it to client
        return res.status(200).send({message: "Token is expired , New token has been generated",
        auth:true,token:token});
      }else {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
    }
    // res.status(200).send(decoded);

    console.log("Time is "+ new Date (JSON.parse( JSON.stringify(decoded))["iat"]));
    req.decoded = decoded;
    next();
  });
}

module.exports = app;
