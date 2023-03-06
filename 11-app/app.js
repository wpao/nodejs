
// ===
// const yargs = require("yargs");
// // console.log(yargs.argv)
// yargs.command(
//     'add',
//     'menambahkan contact baru',
//     () => {},
//     argv => {
//         console.log(argv.nama)
//     }
// )
// yargs.parse(); //untuk menjalankan
// ===
const yargs = require("yargs");
const { simpanContact, listContact, detailContact, deleteContact } = require("./contacts");
yargs.command({
    command: 'add',
    describe: 'menambahkan contact baru',
    builder: {
        nama: {
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        nohp: {
            describe: 'Nomor HP',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        simpanContact(argv.nama, argv.email, argv.nohp)
    }
}).demandCommand();

// menampilkan daftar semua nama & nohp
yargs.command({
    command: 'list',
    describe: 'menampilkan nama & nohp',
    handler(){
        listContact();
    }
})

// menampilkan daftar semua nama & nohp
yargs.command({
    command: 'detail',
    describe: 'menampilkan detail sebuah contact',
    builder: {
        nama: {
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        detailContact(argv.nama);
    }
})

// menampilkan daftar semua nama & nohp
yargs.command({
    command: 'delete',
    describe: 'delete sebuah contact',
    builder: {
        nama: {
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        deleteContact(argv.nama);
    }
})

yargs.parse(); //untuk menjalankan