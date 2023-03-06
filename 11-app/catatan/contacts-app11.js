const chalk = require('chalk');
const fs = require('fs');
const validator = require('validator');

//membuat folder jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

//membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const simpanContact = (nama, email, nohp) => {
    const contact = {nama, email, nohp}
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(fileBuffer)

    // cek duplikat
    const duplikat = contacts.find(contact => contact.nama === nama)
    if(duplikat){
        console.log(chalk.red.strikethrough('nama contact sudah terdaftar'))
        return false;
    }

    // cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.strikethrough('email tidak falid'))
            return false;
        }
    }

    // cek no HP
    if(!validator.isMobilePhone(nohp, 'id-ID')){
        console.log(chalk.red.strikethrough('nomor hp tidak falid'))
        return false;
    }

    contacts.push(contact)
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log(chalk.bgGreen.bold('terimakasih sudah memasukkan data'))
}

module.exports = { simpanContact }