const signupload = require('./signupload');
async function uploadFile(file) {
    const signResponse = await signupload();
    console.log(signResponse)
    const signData = await signResponse;
    const url = "https://api.cloudinary.com/v1_1/dvznvebzi/auto/upload";
    let result = '';
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", "965548286235395");
    formData.append("timestamp", signData.timestamp);
    formData.append("signature", signData.signature);
    formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
    formData.append("folder", "signed_upload_demo_form");

    await fetch(url, {
        method: "POST",
        body: formData
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            result = JSON.parse(data).secure_url;
        });
        return result;
}

module.exports = uploadFile