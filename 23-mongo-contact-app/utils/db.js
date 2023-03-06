const mongoose = require('mongoose');
// const uri = `mongodb+srv://brangkak:nE3OG4aGfiRhtXlE@cluster0.vh7dvpb.mongodb.net/wpu?retryWrites=true&w=majority`
mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})



// // Membuat Schema
// const Contact = mongoose.model('Contact', {
//     nama: {
//         type: String,
//         require: true
//     },
//     nohp: {
//         type: String,
//         require: false
//     },
//     email: {
//         type: String
//     }
// })


// menambah 1 data
// const contact1 = new Contact({
//     nama: 'Paozan wadi',
//     nohp: '081907257059',
//     email: 'wpaozan@gmail.com'
// })

// simpan ke collecton
// contact1.save().then(contact => console.log(contact))