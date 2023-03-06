const { MongoClient, ObjectId } = require('mongodb')
const dbName = process.env.MONGO_DB;

// .env 
require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vh7dvpb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
// const uri = `mongodb+srv://brangkak:nE3OG4aGfiRhtXlE@cluster0.vh7dvpb.mongodb.net/wpu?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// menjalankan dengan cara callback
client.connect((err, client) => {
    if (err) {
        return console.log('koneksi gagal')
    }
    console.log('data berhasil')
    // pilih database
    const db = client.db(dbName)

    // menambahkan 1 data ke collection mahasiswa
    db.collection('mahasiswa').insertOne(
        {
            nama: 'paisal',
            email: 'ijong@gmail.com'
        },
        (err, result) => {
            if (err) {
                return console.log('gagal mengambahkan data!')
            }
            console.log(result)
        }
    )

    // menambahkan lebih dari 1 data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'Ryan',
    //             email: 'ry@gmail.com'
    //         },
    //         {
    //             nama: 'Avip',
    //             email: 'apip@gmail.com'
    //         }
    //     ],
    //     (err, result) => {
    //         if (err) {
    //             return console.log('data gagal ditambahkan')
    //         }
    //         console.log(result)
    //     }
    // )

    // menampilkan semua data yang ada di collection 'mahasiswa'
    // console.log(
    //     db
    //         .collection('mahasiswa')
    //         .find()
    //         .toArray((err, result) => {
    //             console.log(result)
    //         })
    // )

    // menampilkan data berdasarkan kriteria yang ada di collection 'mahasiswa'
    // console.log(
    //     db
    //         .collection('mahasiswa')
    //         .find({ nama: 'Ryan' })
    //         .toArray((err, result) => {
    //             console.log(result)
    //         })
    // )

    // menampilkan data berdasarkan ID yang ada di collection 'mahasiswa'
    // console.log(
    //     db
    //         .collection('mahasiswa')
    //         .find({ _id: ObjectId("64006806c2337b23fde4b627") })
    //         .toArray((err, result) => {
    //             console.log(result)
    //         })
    // )

    // update data di collection 'mahasiswa'
    // db.collection('mahasiswa').updateOne(
    //     { 
    //         _id: ObjectId("64006806c2337b23fde4b627") 
    //     },
    //     {
    //         $set: {
    //             nama: 'Avip syaifulloh'
    //         }
    //     }
    // )

    // update data di collection 'mahasiswa' dengan vidback
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectId("64006806c2337b23fde4b627")
    //     },
    //     {
    //         $set: {
    //             email: 'bre@yahoo.com'
    //         }
    //     }
    // )

    // updatePromise.then(result => {
    //     console.log(result)
    // }).catch(err => {
    //     console.log(err)
    // })

    // 
    // Mengubah data lebih dari 1, berdasarkan kriteria
    // db.collection('mahasiswa').updateMany(
    //     {
    //         nama: 'Erik',
    //     },
    //     {
    //         $set: {
    //             nama: 'Erik Doank'
    //         }
    //     }
    // )

    // menghapus 1 data
    // kita meggunakan cheining dan tidak perlu mamasukkan ke dalam pariable terlebih dahulu 
    // db.collection('mahasiswa')
    //     .deleteOne({
    //         _id: ObjectId("64006806c2337b23fde4b627")
    //     })
    //     .then(result => {
    //         console.log(result)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })


    // menghapus lebih dari satu data
    // db.collection('mahasiswa')
    //     .deleteMany({
    //         nama: 'Erik Doank'
    //     })
    //     .then(result => {
    //         console.log(result)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })




})