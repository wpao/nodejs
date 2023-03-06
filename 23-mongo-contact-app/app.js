const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express();
const port = 3000;

// // Setup EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

//Konfigurasi flash
app.use(cookieParser('secret'))
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(flash())


// halaman home
app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Paozan',
            email: 'wpao@gmail.com'
        },
        {
            nama: 'Ryan',
            email: 'ry@gmail.com'
        }
    ]
    res.render('index', {
        layout: 'layouts/main-layout',
        title: 'home',
        mahasiswa
    })
})

// halaman abaout
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'about'
    })
})

// halaman kontak
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find()
    res.render('contact', {
        title: 'halaman contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg')
    })
})

// halaman detail contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
    res.render('detail', {
        title: 'Halaman detail',
        layout: 'layouts/main-layout',
        contact
    })
})


// listen
app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`)
})