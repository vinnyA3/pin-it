var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config/config'),
    morgan = require('morgan'),
    path = require('path'),
    port = process.env.PORT || 8080;
  //  sass = require('node-sass-middleware');
//connect to the database
mongoose.connect(config.db);
//log every request to the console with morgan
app.use(morgan('dev'));
//body parser middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//cors configuration
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type, \ Authorization');
  next();
});
/*node sass middleware
app.use(
  sass({
    src: __dirname + '/public/sass',
    dest: __dirname + '/public/assets/styles',
    force: true,//force compression/compile every save
    debug: true,
    outputStyle: 'compressed'
  })
);*/
//set the location for the static files
app.use(express.static(path.join(__dirname,'/public')));
//include auth routes
var auth_routes = require('./app/routes/auth_routes')(express);
app.use('/auth', auth_routes);
var api_routes = require('./app/routes/api_routes')(express);
app.use('/api', api_routes);
//get * route
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});
//start server and listen on port
server.listen(port, function(){
  console.log('Server is listening on port: ' + port + '...');
});
