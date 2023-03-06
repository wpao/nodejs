const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator') //check = custom pesan
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const morgan = require('morgan')
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs'); // memudahkan layout

//=================
// Third-party middleware
app.use(expressLayouts) // memudahkan layout
app.use(morgan('dev')) // melengkapi console.log() info

// built-in middleware
app.use(express.static('public')); //supaya bisa di akses
app.use(express.urlencoded({ extended: true })) // mempasing data yang dikirim dari form add contact

// Aplication level middleware
// app.use((req, res, next) => {
//     console.log('time', Date.now())
//     next()
// })

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

//=========================
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
app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'contact',
        contacts,
        msg: req.flash('msg')
    })
})

// halaman form tambah data kontact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'form tambah data contact',
        layout: 'layouts/main-layout'
    })
})

// proses add data kontack
app.post('/contact', [
    body('nama').custom(value => {
        const duplikat = cekDuplikat(value)
        if (duplikat) {
            throw new Error('Nama contact sudah digunakan')
        }
        return true
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'Nomor HP tidak valid').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() })
        res.render('add-contact', {
            title: 'Form tambah data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array()
        })
    } else {
        // res.send(req.body)
        addContact(req.body)
        req.flash('msg', 'Data contact berhasil ditambahkan')
        res.redirect('/contact')
    }
})

// prosess delete contac
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama)

    // jika kontak tidak ada
    if (!contact) {
        res.status(404)
        res.send('<h4>404</h4>')
    } else {
        // res.send('oky')
        deleteContact(req.params.nama)
        req.flash('msg', 'Data contact berhasil dihapus')
        res.redirect('/contact')
    }
})

// halaman form ubah data kontact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('edit-contact', {
        title: 'form ubah data contact',
        layout: 'layouts/main-layout',
        contact
    })
})

// proses ubah data kontak
app.post('/contact/update', [
    body('nama').custom((value, { req }) => {
        const duplikat = cekDuplikat(value)
        if (value !== req.body.oldNama && duplikat) {
            throw new Error('Nama contact sudah digunakan')
        }
        return true
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'Nomor HP tidak valid').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() })
        res.render('edit-contact', {
            title: 'Form Ubah data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
            contact: req.body
        })
    } else {
        // res.send(req.body) //for debug

        // update contact
        updateContacts(req.body)

        // kirim flash message
        req.flash('msg', 'Data contact berhasil ditambahkan')
        res.redirect('/contact')
    }
})


// halaman detail kontak
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