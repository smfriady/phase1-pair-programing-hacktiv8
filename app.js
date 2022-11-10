const express = require('express');
const app = express();
const session = require('express-session')
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
         secure: false,
         sameSite: true
        }
  }))

// index router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

app.listen(port, (err) => {
    if (err) {
        console.log(err, `Server is error ${err}`);
    } else {
        console.log(`Server up, app listening on port ${port}`);
    }
});