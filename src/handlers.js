const data = require('../data/data');
const fs = require('fs');
const path = require('path');
//handler takes care of serving the page 
// handleHome (if statement) passed from router // its the home page 

const search = term => {
    if (term === "") {
        return [];
    }

    return data.filter(site => {
        let siteLowerCase = site.toLowerCase();
        let termLowerCase = term.toLowerCase();
        return siteLowerCase.startsWith(termLowerCase);
    });
}

const handleHome = (request, response) => {
    const filePath = path.join(__dirname, '..', 'public', 'index.html'); //asynchronous way
    fs.readFile(filePath, (error, file) => { // gives you a cb, either an error or the file
        if (error) {
            console.log(error);
            response.writeHead(500, {
                'Content-Type': 'text/html'
            }); // 500 server-side error
            response.end("<h1>Sorry we had a problem at our end</h1>");
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            }); //so the server can expect a HTML file coming in
            response.end(file);
        }
    });
}
// handlePublic (else if statements) passed from router 
const handlePublic = (request, response, url) => { // PASS THE URL
    const extension = url.split('.')[1];
    const extensionType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/js',
        ico: 'image/x-icon'
    };
    const filePath = path.join(__dirname, '..', url);
    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
            response.end("<h1>404 not found </h1>");
        } else {
            response.writeHead(200, {
                'Content-Type': extensionType[extension]
            });
            response.end(file);
        }
    })
    console.log(url);
}
// Objects - put it only once as its called the same 
module.exports = {
    handleHome,
    handlePublic
}