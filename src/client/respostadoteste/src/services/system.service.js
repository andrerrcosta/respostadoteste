import axios from "axios"

export const http = axios.create({
    baseURL: 'http://localhost:3000/'
})

class RecordModel {
    name;
    email;
    cpf;
    address;
    state;
    zipCode;
    city;
    payment;
    cardName;
    cardExpirationMonth;
    cardExpirationYear;
    cardNumber;
    securityCode;

    constructor() { }
}

const s = new RecordModel()
s.name = "Juão Nogueira";
s.email = "juao@nobblecrafts.com";
s.cpf = "111.111.111.11";
s.address = "Rua Algum Lugar, 411, Bairro Sete";
s.state = "MG";
s.zipCode = "22.222-000";
s.city = "Cidade 3";
s.payment = "Boleto";
s.cardName = "Juão João";
s.cardExpirationMonth = 2;
s.cardExpirationYear = 2023;
s.cardNumber = "5078601870000127985";
s.securityCode = "541";

export default {

    save: (model) => {
        // console.log(s, model);
        return http.post("records", model, {});
    },

    getAll: () => {
        return http.get("records");
    }
}