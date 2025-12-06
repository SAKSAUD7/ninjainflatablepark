const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testUpload() {
    const imagePath = 'C:/Users/saksa/.gemini/antigravity/brain/9477408e-7961-4112-95c3-67e419cc53e0/uploaded_image_1765013513804.jpg';

    console.log('Testing upload endpoint...');
    console.log('Image path:', imagePath);

    // Check if file exists
    if (!fs.existsSync(imagePath)) {
        console.error('Error: Image file not found!');
        return;
    }

    const fileStats = fs.statSync(imagePath);
    console.log('File size:', (fileStats.size / 1024 / 1024).toFixed(2), 'MB');

    // Create form data
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));

    try {
        console.log('Sending request to http://localhost:5000/api/cms/upload...');
        const startTime = Date.now();

        const response = await fetch('http://localhost:5000/api/cms/upload', {
            method: 'POST',
            body: formData,
            headers: formData.getHeaders(),
        });

        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        console.log('Response status:', response.status);
        console.log('Response time:', duration, 'seconds');

        const data = await response.json();
        console.log('Response data:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('✅ Upload successful!');
            console.log('Image URL:', data.url);
        } else {
            console.log('❌ Upload failed!');
            console.log('Error:', data.error);
        }
    } catch (error) {
        console.error('❌ Request failed:', error.message);
    }
}

testUpload();
