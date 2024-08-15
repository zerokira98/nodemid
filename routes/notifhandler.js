const express = require("express");
const router = express.Router();
const firebaseApp = require("../fire.js");
const fireadmin = require("../fireadmin.js")
const { getFirestore, getDocs, setDoc, query, collection, where, doc, Timestamp } = require("firebase/firestore");
const db = new getFirestore(firebaseApp);

router.post('/', async function (req, res, next) {

    console.log(req.body);
    const ref = doc(db, 'strukMasuk', req.body.order_id);
    const deviceref = query(collection(db, 'devices'), where("admin", "==", false));
    await setDoc(ref, { 'midstatus': req.body.transaction_status }, { merge: true })
    var queryDevices = await getDocs(deviceref);
    var devicestoken = [];
    queryDevices.forEach(e => {
        var timeDifference = Date.now() - e.data().timestamp.toDate();
        let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        if (differentDays <= 20) devicestoken.push(e.data().token);
    });

    const message_notification = {
        notification: {
            title: "Status pembayaran",
            body: req.body.transaction_status ?? "test abcd"
        },
        tokens: devicestoken
    };
    console.log(message_notification);
    await fireadmin.messaging().sendEachForMulticast(message_notification)
    res.status(200).send();
})

module.exports = router;