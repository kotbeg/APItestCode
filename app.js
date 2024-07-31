const express = require('express');
const app = express();
app.use(express.json());

const uri = 'https://jsonplaceholder.typicode.com/';
const body = JSON.stringify({
                   title: "foo",
                   body: "bar",
                   userId: 11,
                 });

app.get(uri+'users/', (req,res) => {
    res.status(200).json();
});

app.post(uri+'posts/', (req,res) => {

    res.status(200).json();
});