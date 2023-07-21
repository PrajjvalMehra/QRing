const fcm = require("./fcm/setup");
const express = require("express");
const env = require("dotenv");
const { sendEmail } = require("./email");
const { initializeApp } = require("firebase-admin/app");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
env.config({ path: "./.env" });
app.use(cors());

// sendEmail("wwwings420@gmail.com", "Email Verification", "1234567890");
app.use(express.static("../client/build"));
const path = require("path");
const { sendNotification } = require("./fcm/notify");
const { addAlert } = require("./utils");
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

app.post("/invite", (req, res) => {
    const { email, houseId } = req.body;
    sendEmail(
        email,
        "Invitation to join a house on QRing",
        `https://qring.onrender.com/invite?houseId=${houseId}&email=${email}`
    );
    res.send("Email sent");
});

app.post("/ping", (req, res) => {
    const { email, type, houseName } = req.body;
    sendEmail(
        email,
        houseName,
        `${
            type === 0
                ? "Someone is at the door! Please open the door."
                : "You have a delivery!  Please pick it up."
        }`
    );
    sendNotification(
        email,
        houseName,
        `${
            type === 0
                ? "Someone is at the door! Please open the door."
                : "You have a delivery! Please pick it up."
        }`
    );
    addAlert(houseName, email, type);
    res.send("Email sent");
});

app.listen(process.env.PORT, () => {
    `Server is running on port ${process.env.PORT}`;
});
