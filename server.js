const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');
const formData = new FormData();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

let URL = "https://demo.agrotraderlatex.online/api/login";

app.get('/login', (req, res) => {
    res.render('login', {
        page: 'login'
    })
})

app.get('/api/v1/agri', (req, res) => res.send({ status: "Done" }))

formData.append('username', 'Admin991');
formData.append('password', 'Agrotrader123');

axios.post(URL, formData, {
        headers: formData.getHeaders()
    })
    .then(res => console.log("Success >>>>>>>>>>>>>>>>>>>>>>", res.data))
    .catch(err => console.log("Error===========================", err.response.data))

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})