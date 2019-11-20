const http = require('http');
const router = require('./router');
const port = 4000; // port where the server will take requests to listen to it in the browser
const server = http.createServer(router); // creating the server passing the router function
server.listen(port, () => { //running the server
    console.log(`Server up and running on localhost:${port}`);
});