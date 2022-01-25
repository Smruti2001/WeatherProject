const express = require('express')
const https = require("https")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
    
    res.sendFile(__dirname + "/index.html")
    
})


app.post("/", function(req,res){
    console.log(req.body.cityName)
    const location  = req.body.cityName;
    const apiKey = "c3e061cbf145193c06cd6b952c16428d"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=" + unit + "&appid=" + apiKey + "#"
    // const url = "https://api.openweathermap.org/data/2.5/weather?q=umerkote&units=metric&appid=c3e061cbf145193c06cd6b952c16428d#"

    https.get(url, function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon

            const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@4x.png"
            
            res.write("<h1>The weather at "+ location +" is currently " + weatherDescription+" </h1>")
            res.write("<h3>Currently the temperature at "+ location +" is "+ temp + " degree celcius</h3>")
            res.write("<img src= "+ imgURL +">")
            res.send()
        })
    })
})







app.listen(3000, function(req,res){
    console.log("Server is listening at 3000")
})