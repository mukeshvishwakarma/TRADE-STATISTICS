// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

// app.post('/api/fetchStockData', (req, res) => {
//     // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
//     res.sendStatus(200);
// });
// Route to handle API call and fetch trade statistics
app.get("/trade-statistics/:stock/:date", async (req, res) => {
  const { stock, date } = req.params;
  console.log("mukesh", stock, date);
  const apiKey = `HB2phDIoBOixVaGrMSV8eOXBOmW4eFn3`; // Replace this with your Polygon API key

  try {
    // Make the API call to Polygon
    const response = await axios.get(
      `https://api.polygon.io/v1/open-close/${stock}/${date}?apiKey=${apiKey}`
    );
    // console.log("response.data", response.data);
    const tradeStatistics = response.data;

    res.json(tradeStatistics);
  } catch (error) {
    console.error("Error fetching trade statistics:", error.message);
    res.status(500).json({ error: "Error fetching trade statistics" });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
