const handlers = require('./handlers.js')
const router = (request, response) => {
    const url = request.url;
    if (url === '/') {
        handlers.handleHome(request, response);
    } else if (url.indexOf('public')) {
        handlers.handlePublic(request, response, url); // PASS THE URL 
    } else {
        response.writeHead(404);
        response.end('404 not found');
    }
}
module.exports = router;