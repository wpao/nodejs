const http = require('http');
const fs = require('fs');

const port = 3000;

const renderHTML = (path, res) => {
    fs.readFile(path, (err, data)=> {
        if(err){
            res.writeHead(404)
            res.write('Error: file not fount')
        } else {
            res.write(data);
        }
        res.end();
    })
}


http
.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })

    const url = req.url;
    if(url === '/about'){
        renderHTML('./about.html', res);
    }else if(url === '/contact'){
        renderHTML('./contact.html', res);
    } else {
        res.write('Hello World')
        res.end();
    }
    
})
.listen(3000, ()=> {
    console.log('Server is listening on port 3000...')
})