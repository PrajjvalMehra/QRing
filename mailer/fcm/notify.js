const admin = require("firebase-admin");
const messaging = admin.messaging();
const db = admin.firestore();

const sendNotification = async (email, title, body) => {
    console.log("sending notification", email, title, body);
    let userId;
    admin
        .auth()
        .getUserByEmail(email)
        .then((userRecord) => {
            // Fetch data from Firestore
            let uid = userRecord.uid;
            userId = uid;
            return db.collection("users").doc(uid).get();
        })
        .then((doc) => {
            if (doc.exists) {
                const payload = {
                    data: {
                        title: title,
                        body: body,
                    },
                    token: doc.data().token,
                };
                messaging
                    .send(payload)
                    .then((response) => {
                        console.log("Successfully sent message");
                    })
                    .catch((error) => {
                        console.log("Error sending message:", error);
                    });
            } else {
                console.error("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
};

module.exports = { sendNotification };
