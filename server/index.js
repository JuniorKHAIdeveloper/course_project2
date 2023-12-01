const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.post("/iot/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const apiUrl = "http://localhost:8080/api/auth/login";
  const formData = {
    username,
    password,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.cookie("jwttoken", data.token);
    res.status(200).send();
  } catch (error) {
    res.status(401).send();
    console.error("Error:", error.message);
  }
});

app.get("/iot/tenant/deviceInfos", async (req, res) => {
  // console.log(req.cookies.jwttoken)
    const apiUrl = "http://localhost:8080/api/tenant/deviceInfos?pageSize=100&page=0";

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-Authorization": `Bearer ${req.cookies.jwttoken}`,
          "Content-Type": "application/json", // Adjust this header based on your API requirements
          // Add any other headers as needed
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      res.status(200).send(data)
    } catch (error) {
      res.status(400).send()
      console.error("Error:", error);
    }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
