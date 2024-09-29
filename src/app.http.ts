import http from 'http'
import fs from 'fs'



const server = http.createServer((request, response) => {

    console.log(request.url)

    /* response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(`<h1>URL ${ request.url }</h1>`)
    response.end(); 
    */
    /* 
        const data = {name: 'Dandeny', lastName: 'Molina', age: 32,}
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.write(JSON.stringify(data));
        response.end();
    */

    if (request.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        const csslFile = fs.readFileSync('./public/css/styles.css', 'utf-8')
        const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8')

        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write(htmlFile);
        response.end();
        return;
    } 

    if( request.url?.endsWith('.js')){
        response.writeHead(200, {'Content-Type': 'application/javascript'})
    }else if (request.url?.endsWith('.css')) {
        response.writeHead(200, {'Content-Type': 'text/css'})
    }

    const responseContent = fs.readFileSync(`./public${request.url}`);
    response.write(responseContent);
    response.end();
});

server.listen(8080, () => {
    console.log('Server is running in port 8080')
})