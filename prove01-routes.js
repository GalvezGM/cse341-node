const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');        
        res.write('<body><h1>Account Creation</h1><h2>Enter Username</h2><form action="/create-user" method="POST"><label for="username">Username:<input type="text" name="username" required></label><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();        
    }
    
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {            
            body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const username = parseBody.split('=')[1];            
            console.log(username);
            const userList = JSON.parse(fs.readFileSync('userList.json'));
            userList.push(username);
            fs.writeFileSync('userList.json', JSON.stringify(userList));            
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });       
    }

    if (url === '/users') {
        const userList = JSON.parse(fs.readFileSync('userList.json'));
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write(htmlWrap('Prove 1', '<ul>'+userList.map(u=>`<li>${u}</li>`).join('\n')+'</ul>'));
        res.write('</html>');        
        return res.end();       
    }    

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Prove 01</title></head>');
    res.write('<body><h1>Page Error!</h1></body>');
    res.write('</html>');
    res.end();    
};

module.exports.handler = requestHandler;