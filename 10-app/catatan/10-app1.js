const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

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

const pertanyaan1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('masukkan nama anda : ', nama => {
            resolve(nama)
        })
    })
}

const pertanyaan2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('masukkan email anda : ', email => {
            resolve(email)
        })
    })
}

const main = async() => {
    const nama = await pertanyaan1()
    const email = await pertanyaan2()

    const contact = {nama, email}
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(fileBuffer)
    contacts.push(contact)
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log('terimakasih sudah memasukkan data')
    rl.close()
}

main();