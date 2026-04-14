const ImageKit = require('@imagekit/nodejs');

const imageKit = new ImageKit({
    publicKey:"public_lkaRJRlduOGbf82W0Oq45mwcG7c=",
    privateKey: "private_cVoz0MlK5BNf2bv3Zt82chENcps="
});

async function uploadImage(buffer) {
    const result = await imageKit.files.upload({
        file: buffer.toString('base64'),
        fileName: 'image.jpg'
    });
    return result;
}   

module.exports = uploadImage