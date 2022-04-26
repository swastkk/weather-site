const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { fileURLToPath } = require("url");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("https://swastkk.github.io/weather-site/", function (req, res) {
  const city = req.body.cityName;
  const appKey = "09fec64210a22432743e2f9bdf3fed5a";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    appKey +
    "&units=metric#";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const description = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(" <p>The weather is currently " + description + "</p>");
      res.write(
        "<h1> The temperature of " +
          city +
          " is " +
          temp +
          " degree Celcius </h1>"
      );
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});
app.listen(3000, function (req, res) {});
