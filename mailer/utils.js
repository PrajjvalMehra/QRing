const admin = require("firebase-admin");

const addAlert = async (houseName, userEmail, type) => {
    console.log("adding alert", houseName, userEmail, type);
    const db = admin.firestore();
    admin
        .auth()
        .getUserByEmail(userEmail)
        .then((userRecord) => {
            const uid = userRecord.uid;

            db.collection("users")
                .doc(uid)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const alerts = doc.data().alerts;

                        if (alerts === undefined) {
                            db.collection("users")
                                .doc(uid)
                                .update({
                                    alerts: [
                                        {
                                            houseName: houseName,
                                            type: type,
                                            timestamp: Date.now(),
                                        },
                                    ],
                                });
                        } else {
                            db.collection("users")
                                .doc(uid)
                                .update({
                                    alerts: [
                                        ...alerts,
                                        {
                                            houseName: houseName,
                                            type: type,
                                            timestamp: Date.now(),
                                        },
                                    ],
                                });
                        }
                    } else {
                        console.error("No such document!");
                    }
                });
        })
        .catch((error) => {
            console.log("Error fetching user data:", error);
        });
};

module.exports = { addAlert };
