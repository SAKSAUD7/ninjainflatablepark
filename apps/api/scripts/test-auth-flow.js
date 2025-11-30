const http = require('http');

// First, login to get the token
const loginData = JSON.stringify({
    email: 'admin@ninjapark.com',
    password: 'admin123'
});

const loginOptions = {
    hostname: 'localhost',
    port: 4000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
    }
};

console.log('Testing authentication flow...\n');
console.log('1. Logging in...');

const loginReq = http.request(loginOptions, (res) => {
    let body = '';

    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        console.log('   Status:', res.statusCode);

        if (res.statusCode === 200) {
            const response = JSON.parse(body);
            const token = response.data.token;
            console.log('   ✅ Login successful!');
            console.log('   Token received:', token.substring(0, 20) + '...\n');

            // Test protected endpoint
            console.log('2. Testing protected endpoint (/api/auth/me)...');

            const meOptions = {
                hostname: 'localhost',
                port: 4000,
                path: '/api/auth/me',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const meReq = http.request(meOptions, (meRes) => {
                let meBody = '';

                meRes.on('data', (chunk) => {
                    meBody += chunk;
                });

                meRes.on('end', () => {
                    console.log('   Status:', meRes.statusCode);

                    if (meRes.statusCode === 200) {
                        const meResponse = JSON.parse(meBody);
                        console.log('   ✅ Protected endpoint accessible!');
                        console.log('   User:', meResponse.data.email);
                        console.log('   Role:', meResponse.data.role?.name || 'N/A');
                        console.log('\n✅ All authentication tests passed!');
                    } else {
                        console.log('   ❌ Protected endpoint failed');
                        console.log('   Response:', meBody);
                    }
                });
            });

            meReq.on('error', (error) => {
                console.error('   ❌ Error:', error.message);
            });

            meReq.end();
        } else {
            console.log('   ❌ Login failed');
            console.log('   Response:', body);
        }
    });
});

loginReq.on('error', (error) => {
    console.error('❌ Error:', error.message);
});

loginReq.write(loginData);
loginReq.end();
