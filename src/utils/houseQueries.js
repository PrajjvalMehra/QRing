import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { fetchUserInfoById } from "./userQueries";

async function addHouse(name) {
    const houseId = uuidv4();
    const userData = await localStorage.getItem("user");
    const uid = JSON.parse(userData).uid;
    const userName = await fetchUserInfoById(uid);
    console.log("Adding house...", uid, userName.name);
    await setDoc(doc(db, "houses", houseId), {
        name: name,
        members: [{ uid: uid, admin: true, name: userName.name }],
        alerts: [],
        uids: [uid],
    }).then(async () => {
        await updateDoc(doc(db, "users", uid), {
            houses: [houseId],
        }).then(() => {
            console.log("House added.");
            return;
        });
    });
}

async function getHouseDetails(houseId) {
    const docRef = doc(db, "houses", houseId);
    const docSnapshot = await getDoc(docRef);
    const data = docSnapshot.data();
    console.log({ data: data });
    return data;
}

export { addHouse, getHouseDetails };
