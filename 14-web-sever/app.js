const express = require('express')
const app = express()
const port = 3000

// get
app.get('/', (req, res) => {
    // res.send('hello world')
    // res.json({
    //     nama: 'sandhika',
    //     email: 'wpao@gmail.com',
    //     nohp: '0800090880'
    // })
    res.sendFile('./index.html', {root: __dirname})
})

// get
app.get('/about', (req, res) => {
    res.send('about developer')
})

// use digunakan untuk menjalankan midleware
app.use('/', (req, res) => {
    res.status(404)
    res.send('404')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})