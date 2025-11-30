
const http = require('http');

const options = {
    hostname: 'localhost',
    port: 4000,
    path: '/api/auth/fix-admin',
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);

    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log('Response Body:');
        console.log(responseBody);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.end();
