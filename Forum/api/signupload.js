function signupload() {
    const currentTime = Math.round((new Date).getTime() / 1000);
    const apiSecret = 'Wqbt7VvnH7bPQTWd_cPRD5K1kgE'
    const sha1 = require('sha1');
    
    const payloadToSign = `eager=c_pad,h_300,w_400|c_crop,h_200,w_260&folder=signed_upload_demo_form&timestamp=${currentTime}`
    console.log(payloadToSign)
    // Generate the SHA-1 signature
    const signature = sha1(payloadToSign + apiSecret);
    
    console.log(signature); // This is your SHA-1 signature

    return { timestamp: currentTime, signature }
}

module.exports = signupload