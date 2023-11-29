const crypto = require("crypto");

// Generate a random secret of 32 bytes
const secret = crypto.randomBytes(32).toString('hex');

const encrypt = (password) => {
  const iv = crypto.randomBytes(16); // Use a 16-byte IV
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret, 'hex'), iv);

  const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    password: encryptedPassword.toString("hex"),
  };
};

const decrypt = (encryption) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secret, 'hex'),
    Buffer.from(encryption.iv, "hex")
     );
     console.log(secret + encryption.iv)
  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, "hex")),
    decipher.final(),
  ]);
  return decryptedPassword.toString();
};

module.exports = { encrypt, decrypt, secret };
