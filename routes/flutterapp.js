const express = require("express");
const Struk = require("../models/struk");
const router = express.Router();


router.post('/', function (req, res, next) {
    console.log(req.body);
    var a = new Struk(req.body)
    var items = [];
    var total = 0;
    for (const key in a.itemCards) {
        console.log(a);
        if (Object.hasOwnProperty.call(req.body.itemCards, key)) {
            const element = req.body.itemCards[key];
            items.push({
                "id": element.type,
                "price": element.price,
                "quantity": element.pcsBarang,
                "name": element.type == 0 ? "Haircut" : (element.type == 1 ? "Shave" : element.name)

            })
            total += element.price * element.pcsBarang
            // console.log(items);
        }
    }
    let requestdata = {
        "datetime": req.body.tanggal,
        "items": items,
        "order_id": req.body.id,
        "total": total,
    }
    let parameter = {
        "payment_type": "qris",
        "transaction_details": {
            "gross_amount": requestdata.total,
            "order_id": requestdata.order_id,
        },
        "item_details": requestdata.items,
        "acquirer": "gopay"
    };
    // console.log(requestdata);
    // console.log(parameter);
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