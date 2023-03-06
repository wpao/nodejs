const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts')

const morgan = require('morgan')
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');

//=================
// Third-party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

// built-in middleware
app.use(express.static('public'));

// Aplication level middleware
app.use((req, res, next) => {
    console.log('time', Date.now())
    next()
})

//=========================
// get
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

// get
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'about'
    })
})

// 
app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'contact',
        contacts
    })
})

// 
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'detail',
        contact
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})