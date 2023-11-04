function signupload() {
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({
        cloud_name: 'dvznvebzi',
        api_key: '965548286235395',
        api_secret: 'Wqbt7VvnH7bPQTWd_cPRD5K1kgE'
    });
    const apiSecret = cloudinary.config().api_secret;
    const timestamp = Math.round((new Date).getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request({
        timestamp,
        eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
        folder: 'signed_upload_demo_form'
    }, apiSecret);

    return { timestamp, signature }
}

module.exports = signupload