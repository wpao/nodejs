const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const { body, validationResult, check } = require('express-validator')
const methodOverride = require('method-override')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact');
const { updateOne } = require('./model/contact');

const app = express();
const port = 3000;

// setup meethod override
app.use(methodOverride('_method'))

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

// halaman form tambah data kontact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'form tambah data contact',
        layout: 'layouts/main-layout'
    })
})

// proses tambah data kontack
app.post('/contact', [
    body('nama').custom(async value => {
        const duplikat = await Contact.findOne({ value: value })
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
        res.render('add-contact', {
            title: 'Form tambah data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array()
        })
    } else {
        // res.send(req.body)
        Contact.insertMany(req.body, (error, result) => {
            // kirim flash mesage
            req.flash('msg', 'Data contact berhasil ditambahkan')
            res.redirect('/contact')
        })
    }
})

// prosess delete contac
// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({ nama: req.params.nama })

//     // jika kontak tidak ada
//     if (!contact) {
//         res.status(404)
//         res.send('<h4>404</h4>')
//     } else {
//         // res.send('oky')
//         Contact.deleteOne({ _id: contact._id }).then(result => {
//             req.flash('msg', 'Data contact berhasil dihapus')
//             res.redirect('/contact')
//         })
//     }
// })
// 
app.delete('/contact', (req, res) => {
    // res.send(req.body)
    Contact.deleteOne({ nama: req.body.nama }).then(result => {
        req.flash('msg', 'Data contact berhasil dihapus')
        res.redirect('/contact')
    })
})

// halaman form ubah data kontact
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama })
    res.render('edit-contact', {
        title: 'form ubah data contact',
        layout: 'layouts/main-layout',
        contact
    })
})

// proses ubah data kontak
app.put('/contact', [
    body('nama').custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({ nama: value })
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
        res.render('edit-contact', {
            title: 'Form Ubah data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
            contact: req.body
        })
    } else {
        Contact.updateOne(
            { _id: req.body._id },
            {
                $set: {
                    nama: req.body.nama,
                    email: req.body.email,
                    nohp: req.body.nohp
                }
            }
        ).then(result => {
            req.flash('msg', 'Data contact berhasil ditambahkan')
            res.redirect('/contact')
        })
    }
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