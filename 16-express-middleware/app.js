const express = require('express')
const expressLayouts = require('express-ejs-layouts')
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

// use digunakan untuk menjalankan midleware
// app.use('/', (req, res) => {
//     res.send('about developer')
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})