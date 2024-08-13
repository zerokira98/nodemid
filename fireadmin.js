
var admin = require("firebase-admin");

var serviceAccount = require("./groom-dev-33492-firebase-adminsdk-fub4w-fae578dc83.json");

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
module.exports = app;