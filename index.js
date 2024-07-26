const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
require('dotenv').config();
const staticRoute = require('./routes/staticRouter');

app.set('view engine', 'ejs');

app.set("views", path.resolve("./views"));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
 
app.use("/", staticRoute);

const API_KEY = process.env.API_KEY;
// app.get('/',(req,res) =>{
//     res.send("Hello World");
// })

app.get("/", function(req,res){
    // return res.render("home");
    const place = req.query.place
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}`

    axios.get(url).then(response => {
        const data = response.data;
        // console.log(data)
        const cityName = data.name;
        const temperature = data.main.temp;
        const message = `City Name: ${cityName} <br> Temperature: ${temperature}`
        res.send(`<html><body><div id='container'><h1>${message}</h1></div></body></html>`)
    })
    .catch(error => {
        console.log(error);
    })
});

app.listen(3000, function() {
    console.log("Server is running");
})