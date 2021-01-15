const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || '127.0.0.1';
const Joi = require("@hapi/joi");
const model = require("./models/record.model");

const fakeDb = [
    {
        name: "Art Barkley",
        email: "aaa@bbb.com",
        cpf: "000.111.222.33",
        address: "Somewhere",
        state: "MG",
        zipCode: "30.300-300",
        city: "CA",
        payment: "cartão",
        cardName: "A Barkley ",
        cardExpirationMonth: 7,
        cardExpirationYear: 2022,
        cardNumber: "5555 5555 5555 5555",
        securityCode: "333",
        created: new Date(2021, 0, 13)
    },
    {
        name: "BB King",
        email: "bbb@bbb.com",
        cpf: "000.111.222.34",
        address: "Somewhere",
        state: "MG",
        zipCode: "30.300-300",
        city: "CA",
        payment: "cartão",
        cardName: "Riley B King",
        cardExpirationMonth: 7,
        cardExpirationYear: 2022,
        cardNumber: "5555 5555 5555 5555",
        securityCode: "333",
        created: new Date(2021, 0, 13)
    },
    {
        name: "Chet Baker",
        email: "ccc@bbb.com",
        cpf: "000.111.222.35",
        address: "Somewhere",
        state: "MG",
        zipCode: "30.300-300",
        city: "CA",
        payment: "cartão",
        cardName: "Chesney H Baker Jr.",
        cardExpirationMonth: 7,
        cardExpirationYear: 2022,
        cardNumber: "5555 5555 5555 5555",
        securityCode: "333",
        created: new Date(2021, 0, 13)
    },
];

/**
 * Basic CORS
 */

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/records", (req, res) => {
    res.status(200).send(fakeDb);
});

app.post("/records", async (req, res) => {
    
    try {
        // console.log("Body Um", req.body);
        if (req.body === undefined) return res.status(400).send("Bad Request");
        if (req.body.payment === "Cartão") {
            await model.RecordCard.validateAsync(req.body);
        } else {
            await model.RecordBankSlip.validateAsync(req.body);
        }

        let record = {};
        record.name = req.body.name;
        record.email = req.body.email;
        record.cpf = req.body.cpf;
        record.address = req.body.address;
        record.state = req.body.state;
        record.zipCode = req.body.zipCode;
        record.city = req.body.city;
        record.payment = req.body.payment;

        if (req.body.payment === "Cartão") {

            record.cardName = req.body.cardName;
            record.cardExpirationMonth = req.body.cardExpiration.month;
            record.cardExpirationYear = req.body.cardExpiration.year;
            record.cardNumber = req.body.cardNumber;
            record.securityCode = req.body.securityCode;

        }

        record.created = new Date(Date.now());

        fakeDb.push(record);

        return res.status(200).send(record);
    } catch (e) {
        console.log("Catched Error => \n\n", e.stack);
        res.status(401).send({ error: e.stack });
    }


});

app.listen(port, allowedOrigin, () => {
    console.log("Server connected on ", port, ".\n\nAllowing Origin", allowedOrigin);
});
