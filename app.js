const express = require('express');
const app = express();
const session = require('express-session')
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const PORT = process.env.PORT || 5000

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
         secure: false,
         sameSite: true
        }
  }))

// index router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err, `Server is error ${err}`);
    } else {
        console.log(`Server up, app listening on port ${PORT}`);
    }
});