const CryptoJS = require('crypto-js')
var Encryptor = require('encryptor-js');



export const encodeB64 = (rawStr) => {
  
    var aa = "4d1a90569640acf5b68ed151c9d49351ae6286aa0ebdbf8dc477f33dd6fa20d4"
    var encryptedMessage = new Encryptor().encrypt(rawStr, 'AdxweqaskdlkjsgioujpDOPIUSUDioashodihsidlasd213xz');
    
    console.log("encryptedMessage : "+encryptedMessage);
 

    return encryptedMessage
}


export const decodeB64 = (base64) => {
    try {
        var decryptedMessage = new Encryptor().decrypt(base64, 'AdxweqaskdlkjsgioujpDOPIUSUDioashodihsidlasd213xz');
        return decryptedMessage
    } catch {
        return 'cannotdecodeb64'
    }
}


