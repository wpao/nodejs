const { tulisPertanyaan, simpanContact } = require('./contacts')

const main = async() => {
    const nama = await tulisPertanyaan('nama : ')
    const email = await tulisPertanyaan('email : ')
    const nohp = await tulisPertanyaan('nohp : ')

    simpanContact(nama, email, nohp)
}

main();