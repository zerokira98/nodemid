const express = require("express");
const Struk = require("../models/struk");
const router = express.Router();
const midtransClient = require("midtrans-client");

const firebaseApp = require("../fire.js");
const { setDoc, doc, getFirestore } = require("firebase/firestore");
const db = new getFirestore(firebaseApp);

const midApi = new midtransClient.CoreApi({
    serverKey: 'SB-Mid-server-6fstaFj_2WMLl4nz34LJHgWy',
    clientKey: 'SB-Mid-client-DYN_EMsTJBpM3-GA'
})

router.post('/', function (req, res, next) {
    var a = Struk.from(req.body)
    var items = [];
    var total = 0;
    console.log(a.itemCards);
    a.itemCards.forEach(key => {
        console.log(key);
        items.push({
            "id": key.type,
            "price": key.price,
            "quantity": key.pcsBarang,
            "name": key.type == 0 ? "Haircut" : (key.type == 1 ? "Shave" : key.name)

        })
        total += key.price * key.pcsBarang
        console.log(items);
    });
    let parameter = {
        "payment_type": "qris",
        "transaction_details": {
            "gross_amount": total,
            "order_id": a.id,
        },
        "item_details": items,
        "acquirer": "gopay"
    };
    // console.log(requestdata);
    console.log(parameter);
    midApi.charge(parameter).then(async (response) => {
        try {
            var midtrans_id = response.transaction_id;
            var qrurl = response.actions[0]['url'];
            const ref = doc(db, 'strukMasuk', req.body.id);
            var querySnapshot = await setDoc(ref, { 'midId': midtrans_id, 'midstatus': response.transaction_status }, { merge: true })
            res.status(200).header({ 'Content-Type': 'application/json' }).send({ 'midId': midtrans_id, 'qrcode_url': qrurl })

        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })
})
module.exports = router;