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
app.use(express.static("../client/build"));
const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

app.post("/invite", (req, res) => {
    const { email, houseId } = req.body;
    sendEmail(
        email,
        "Invitation to join a house on QRing",
        `https://qeing.onrender.com/invite?houseId=${houseId}&email=${email}`
    );
    res.send("Email sent");
});

app.listen(process.env.PORT, () => {
    `Server is running on port ${process.env.PORT}`;
});
