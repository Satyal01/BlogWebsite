const {createHmac, randomBytes } = require('crypto');


const s = randomBytes(256).toString();


const hash = createHmac("sha256", s);

hash.update("this is my password");

console.log(hash.digest("hex"))