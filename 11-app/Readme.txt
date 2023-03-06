console.log(process.argv) //adalah fungsi default untuk menangkap perintah di terminal

yargs //untuk membuat perintah pada terminal // atau menangkap apa yang kita tulis
npm i yargs@16.2.0
npm i chalk@4.1.0
npm i validator@13.5.2

npm init -y

console.log(yargs.argv)

//===
// file: greet.js
module.exports = { simpanContact }
// file: app.js
const { simpanContact } = require("./contacts");

//===
// file: greet.js
export function greet(name) {
  console.log(`Hello, ${name}!`);
}
// file: app.js
import { greet } from './greet.js';
greet('John'); // output: Hello, John!
