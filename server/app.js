require('dotenv').config();

const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const path = require('path');
const passport = require('passport');

require('./configs/db.config');
require('./configs/passport.config');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));




require('./configs/session.config')(app);

app.use(passport.initialize());
app.use(passport.session());

app.locals.title = "Express - Generated with IronGenerator";


require('./configs/cors.config')(app);




app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/watchList.routes'));



module.exports = app;
