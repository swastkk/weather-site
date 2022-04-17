const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=09fec64210a22432743e2f9bdf3fed5a&units=metric#";
  https.get(url, function (response) {
    console.log(response);
  });
  res.send("currently running af");
});

app.listen(3000, function (req, res) {
  console.log("Running on server port:3000");
});
