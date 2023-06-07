const express = require("express");
const env = require("dotenv");
const { sendEmail } = require("./email");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
env.config({ path: "./.env" });

// sendEmail("wwwings420@gmail.com", "Email Verification", "1234567890");
app.post("/invite", (req, res) => {});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
