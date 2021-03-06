const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

let URL = "https://demo.agrotraderlatex.online/api/login";

// get gangs
let URL2 = "https://demo.agrotraderlatex.online/api/view_gangs";

// get roles
let URL3 = "https://demo.agrotraderlatex.online/api/view_roles";

let URL4 = "https://demo.agrotraderlatex.online/api/get_farmers";

let weighBridgeBuyURL = "https://demo.agrotraderlatex.online/api/weigh_bridge/add_purchase";

app.get('/', (req, res) => res.send("Agri API Middleware"))
app.post('/api/v1/login', (req, res) => {
    const formData = new FormData();
    let username = req.body.username;
    let password = req.body.password;

    if (username.length > 0 && password.length > 0) {
        formData.append('username', username);
        formData.append('password', password);

        makeRequest(formData)
            .then(response => res.send(response))
            .catch(error => res.send(error))
    }
})

const makeRequest = async(form_data) => {
    return await axios.post(URL, form_data, {
            headers: form_data.getHeaders()
        })
        .then(res => res.data)
        .catch(err => err.response.data)
}

// get gangs and tapper

app.get('/gangsAndTappers', (req, res) => {

    makeRequests()
        .then(response => res.send(response))
        .catch(error => res.send(error))
})

const makeRequests = async() => {
    return await axios.get(URL2, {

        })
        .then(res => res.data)
        .catch(err => err.response.data)
}

// get roles
app.get('/roles', (req, res) => {

    makeRoleRequests()
        .then(response => res.send(response))
        .catch(error => res.send(error))
})

const makeRoleRequests = async() => {
    return await axios.get(URL3, {

        })
        .then(res => res.data)
        .catch(err => err.response.data)
}

// get farmers

app.get('/farmers', (req, res) => {

    makeFarmersRequests()
        .then(response => res.send(response))
        .catch(error => res.send(error))
})

const makeFarmersRequests = async() => {
    return await axios.get(URL4, {

        })
        .then(res => res.data)
        .catch(err => err.response.data)
}


// Making post to weigh bridge buy section
app.post('/weighBridgeBuy', (req, res) => {
    const formData2 = new FormData();
    let farmer_id = req.body.farmer_id;
    let vehicle_plate = req.body.vehicle_plate;
    let date = req.body.date;
    let gross_weight = req.body.gross_weight;
    let gross_time = req.body.gross_time;
    let tare_weight = req.body.tare_weight;
    let tare_time = req.body.tare_time;
    let net_weight = req.body.net_weight;
    let net_tonage = req.body.net_tonage;
    let storage = req.body.storage;

    formData2.append('farmer_id', farmer_id);
    formData2.append('vehicle_plate', vehicle_plate);
    formData2.append('date', date);
    formData2.append('gross_weight', gross_weight);
    formData2.append('gross_time', gross_time);
    formData2.append('tare_weight', tare_weight);
    formData2.append('tare_time', tare_time);
    formData2.append('net_weight', net_weight);
    formData2.append('net_tonage', net_tonage);
    formData2.append('purchaseBy', farmer_id);
    formData2.append('storage', storage);

    makeWeighRequest(formData2)
        .then(response => res.send(response))
        .catch(error => res.send(error))

})
const makeWeighRequest = async(form_data2) => {
    return await axios.post(weighBridgeBuyURL, form_data2, {
            headers: form_data2.getHeaders()
        })
        .then(res => res.data)
        .catch(err => err.response.data)
}

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})