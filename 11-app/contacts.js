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

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(fileBuffer)
    return contacts;
}

const simpanContact = (nama, email, nohp) => {
    const contact = {nama, email, nohp}
    const contacts = loadContact();

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
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)) //tulis ulang
    console.log(chalk.bgGreen.bold('terimakasih sudah memasukkan data'))
}

const listContact = () => {
    const contacts = loadContact();
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}.${contact.nama} - ${contact.nohp}`)
    });
}

const detailContact = nama => {
    const contacts = loadContact()
    const contact = contacts.find(
        contact => contact.nama.toLowerCase() === nama.toLowerCase()
    )
    if(!contact){
        console.log(chalk.red(`${nama} tidak ditemukan`))
        return false;
    }
    console.log(chalk.cyan.inverse.bold(contact.nama))
    console.log(contact.nohp)
    if(contact.email){
        console.log(contact.email)
    }
}

const deleteContact = nama => {
    const contacts = loadContact()
    const newContacts = contacts.filter(
        contact => contact.nama.toLowerCase() !== nama.toLowerCase()
    )    
    if(contacts.length === newContacts.length){
        console.log(chalk.red(`${nama} tidak ditemukan`))
        return false;
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts)) //tulis ulang file
    console.log(chalk.bgGreen.bold(`${nama} berhasil dihapus`))
}

module.exports = { simpanContact, listContact, detailContact, deleteContact }