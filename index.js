
import express from 'express'

const app = express()

const PORT = process.env.PORT || 5001

app.get('/', function (req, res) {
    res.send('Hello World tai')
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))