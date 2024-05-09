// use the .env file to store the port number
require('dotenv').config();

const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const app = express()
const connectDb = require('./server/config/db')
const methodOverride = require('method-override');


const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname + "/public", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));

app.get('/', (req, res) => 
res.render('index')
)
connectDb();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(methodOverride('_method'));
connectDb();
app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/admin'));

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
  });