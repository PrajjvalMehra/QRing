import { getMessaging, getToken } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
const handleNotifyToken = getToken(messaging, {
    vapidKey:
        "BG7QhhfoKZ7mK_zxJf1z6wGroTr5gKZEUzYgJjIfnG_SaOU1mp5OVkaiu6xRONZ3bDhPnPNpoQgMEPbtV0P528o",
})
    .then((currentToken) => {
        if (currentToken) {
            const uid = JSON.parse(localStorage.getItem("user")).uid;
            const userRef = doc(db, "users", uid);
            setDoc(
                userRef,
                {
                    token: currentToken,
                    appNotifications: true,
                },
                { merge: true }
            )
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        } else {
            // Show permission request UI
            console.log(
                "No registration token available. Request permission to generate one."
            );
            // ...
        }
    })
    .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
    });
export { messaging, handleNotifyToken };
