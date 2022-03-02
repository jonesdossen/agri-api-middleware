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

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})