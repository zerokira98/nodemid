

// const express = require('express')
import express from 'express'
// import { firebaseApp } from './fire.js'
// import { getFirestore, getDocs, collection } from "firebase/firestore";
// import midtransClient from "midtrans-client";
import { authenticateKey } from "./api.js";
const app = express()
const PORT = process.env.PORT || 5001
// Create a new client
// const db = new getFirestore(firebaseApp);
// const midApi = new midtransClient.CoreApi({
//     serverKey: 'SB-Mid-server-6fstaFj_2WMLl4nz34LJHgWy',
//     clientKey: 'SB-Mid-client-DYN_EMsTJBpM3-GA'
// })
app.use(express.json())
app.get('/', function (req, res) {
    res.send('Hello World tai')
})
app.get('/download', function (req, res) {
    const file = `frame.png`;
    res.download(file); // Set disposition and send it.
});
app.post('/fluttertest', authenticateKey, function (req, res) {
    console.log(req.body);
    var items = [];
    var total = 0;
    for (const key in req.body.itemCards) {
        // console.log(key);
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
    console.log(requestdata);
    console.log(parameter);
    // midApi.charge(parameter).then((response) => {
    //     console.log(response);
    //     res.send('Hello World')
    // })
    res.send({ 'id': 'abcd-efgh', 'qrcode_url': '/download' })
})
app.post('/midtrans_post', function (req, res) {
    let items = []
    if (req.body("data") == null) return res.send('empty body')
    console.log(req.body);
    // for (const key in req.body("items")) {
    //     items.push({
    //         "id": key.id,
    //         "price": key.price,
    //         "quantity": key.pcs,
    //         "name": key.name

    //     })

    // }
    // let requestdata = {
    //     "datetime": req.body("date_time"),
    //     "items": items,
    //     "order_id": req.body("order_id"),
    //     "total": req.body("total"),
    // }
    // let parameter = {
    //     "payment_type": "qris",
    //     "transaction_details": {
    //         "gross_amount": requestdata.total,
    //         "order_id": requestdata.order_id,
    //     },
    //     "item_details": requestdata.items,
    //     "acquirer": "gopay"
    // };
    // midApi.charge(parameter).then((response) => {
    //     console.log(response);
    //     res.send('Hello World')
    // })
})
app.get('/transactionstatus', authenticateKey, function (req, res) {
    // res.send('telo')
    // midApi.transaction.status('589a49c8-0759-4431-8cd1-b48b7608d81a')
    //     .then((response) => {
    //         console.log(response);
    //         res.send('Hello World')
    //     });

})
app.get('/invoice', authenticateKey, function (req, res) {
    // res.send('telo')
    // midApi.transaction.qr('589a49c8-0759-4431-8cd1-b48b7608d81a')
    //     .then((response) => {
    //         console.log(response);
    //         res.send('Hello World')
    //     });

})
// app.get('/firestore', async function (req, res) {
//     console.log(
//         req.query
//     );
//     res.send('Hello World2 ' + req.query.telo + ' ' + req.query.tahu)
//     try {
//         var querySnapshot = await getDocs(collection(db, "barang"))
//         querySnapshot.forEach((doc) => {
//             console.log(`${doc.id} => ${doc.data().namaBarang}`);
//         });
//     } catch (error) {

//         console.log(error)
//     }
// })
app.listen(PORT, () => console.log(`Listening on ${PORT}`))