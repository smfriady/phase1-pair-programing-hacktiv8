const express = require('express');
const app = express();
const indexRouter = require('./routes');

const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// index router
app.use('/', indexRouter);

app.listen(port, (err) => {
    if (err) {
        console.log(err, `Server is error ${err}`);
    } else {
        console.log(`Server up, app listening on port ${port}`);
    }
});