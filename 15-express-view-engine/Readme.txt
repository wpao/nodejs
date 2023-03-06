
chanel = web programming unpas

npm i express@4.17.1
npm install -g nodemon


//templete enjine adalah salah satu cara mengelola tampilan
//express // templete enjine banyak

npm install ejs@3.1.6

//exstension untuk mengelola scrip ejs


//mengabaikan file menggunakan ejs
//.prettierignore
//*.ejs //mengabaikan semua perubahan pada file ejs //tidak otomatis dirapikan oleh prettier

<%- include('layouts/header') %>
<%- include('layouts/nav') %>
<%- include('layouts/footer') %>

//package ejs supaya bisa one view
npm install express-ejs-layouts@2.5.0

//
<h2>hallo <%= nama %></h2>
    <h4>Daftar Mahasiswa</h4>
    <% mahasiswa.forEach(mhs=>{ %>
        <ul>
            <li>nama: <%= mhs.nama %></li>
            <li>nama: <%= mhs.email %></li>
        </ul>
    <% }) %>