var Encryptor = require("encryptor-js");

export const encodeB64 = (rawStr) => {
  var encryptedMessage = new Encryptor().encrypt(
    rawStr,
    "AdxweqaskdlkjsgioujpDOPIUSUDioashodihsidlasd213xz"
  );
  return encryptedMessage;
};

export const decodeB64 = (base64) => {
  try {
    var decryptedMessage = new Encryptor().decrypt(
      base64,
      "AdxweqaskdlkjsgioujpDOPIUSUDioashodihsidlasd213xz"
    );
    return decryptedMessage;
  } catch {
    return "cannotdecodeb64";
  }
};
