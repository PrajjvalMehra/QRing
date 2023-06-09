const express = require("express");
const env = require("dotenv");
const { sendEmail } = require("./email");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
env.config({ path: "./.env" });
app.use(cors());

// sendEmail("wwwings420@gmail.com", "Email Verification", "1234567890");
app.post("/invite", (req, res) => {
    const { email, houseId } = req.body;
    sendEmail(
        email,
        "Invitation to join a house on QRing",
        `https://qring.herokuapp.com/house/${houseId}`
    );
    res.send("Email sent");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
