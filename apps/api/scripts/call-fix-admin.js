const http = require('http');

const data = JSON.stringify({
    name: 'Admin',
    email: 'admin@ninjapark.com',
    password: 'admin123',
    roleId: null // Will be created if needed
});

const options = {
    hostname: 'localhost',
    port: 4000,
    path: '/api/auth/fix-admin',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';

    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        console.log('StatusCode:', res.statusCode);
        console.log('Response Body:');
        console.log(body);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
