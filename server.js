require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const Signature = require('./models/signature.js')
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');

(async function () {
    try {
        const client = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true
        });
    } catch (e) {
        console.error("Error connecting to database!")
    }
})()

const app = express()
app.use(cors())

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('Keep Going!');
});

app.get('/api/messages', (req, res) => {
    (async function () {
        try {
            const results = await Signature.find({});
            res.json(results)
            console.log(results);
        } catch (err) {
            throw err;
        }
    })()

})


app.post('/api/messages', (req, res) => {
    const {
        name,
        message
    } = req.body
    if (name.trim() || message.trim()) {
        return res.status(422).send("Name and message required!")
    }

    const newSignature = new Signature({
        "name": name,
        "message": message
    })
    newSignature.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newSignature);
    });
});


app.listen(process.env.PORT, () => {
    console.log(`Server  running on port ${process.env.PORT}`);

})
