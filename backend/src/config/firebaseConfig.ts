var admin = require("firebase-admin");

var serviceAccount = require("./firebase_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://diploma-storage-32e1a.appspot.com",
});

export const bucket = admin.storage().bucket(); 
