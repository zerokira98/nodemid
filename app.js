const express = require("express");
const app = express();
const authenticateKey = require("./api.js");
const fireadmin = require("./fireadmin.js")
const flutterappRoute = require("./routes/flutterapp.js")
const notifhandlerRoute = require("./routes/notifhandler.js")

app.use(express.json())
//
app.use('/fluttertest', authenticateKey, flutterappRoute)
app.use('/notification', notifhandlerRoute);
//
app.get("/", (req, res) => res.type('html').send(html));
app.get('/download', function (req, res) {
  const file = `frame.png`;
  res.send(file); // Set disposition and send it.
});
app.post('/fluttertest2', authenticateKey, async function (req, res) {
  let items = []
    ;
  const message_notification = {
    notification: {
      title: req.body.title,
      body: req.body.body
    },
    token: req.body.token
  };
  var awaw = await fireadmin.messaging().send(message_notification)
  console.log(message_notification);
  if (req.body.data == null) return res.send('empty body')
  console.log(req.body);
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
const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                        <title>Hello from Render!</title>
                        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
                        <script>
                        setTimeout(() => {
                          confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            disableForReducedMotion: true
                            });
                            }, 500);
                            </script>
                            <style>
                            @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
                            @font-face {
                              font-family: "neo-sans";
                              src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
                              font-style: normal;
                              font-weight: 700;
                              }
                              html {
                                font-family: neo-sans;
                                font-weight: 700;
                                font-size: calc(62rem / 16);
                                }
                                body {
                                  background: white;
                                  }
                                  section {
                                    border-radius: 1em;
                                    padding: 1em;
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    margin-right: -50%;
                                    transform: translate(-50%, -50%);
                                    }
                                    </style>
                                    </head>
                                    <body>
                                    <section>
                                    Hello from Render!
                                    </section>
                                    </body>
                                    </html>
                                    `
