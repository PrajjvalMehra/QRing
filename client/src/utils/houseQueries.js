import { db } from "./firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { fetchUserInfoByEmail, fetchUserInfoById } from "./userQueries";

async function addHouse(name, coordinates, houseId) {
    const userData = await localStorage.getItem("user");
    const uid = JSON.parse(userData).uid;
    const userName = await fetchUserInfoById(uid);
    await setDoc(doc(db, "houses", houseId), {
        name: name,
        coordinates: coordinates,
        members: [{ uid: uid, admin: true, name: userName.name }],
        alerts: [],
        uids: [uid],
    }).then(async () => {
        await updateDoc(doc(db, "users", uid), {
            houses: [houseId],
        }).then(() => {
            return true;
        });
    });
}
async function addMember(houseId, email) {
    const houseData = await getHouseDetails(houseId);
    const userData = await fetchUserInfoByEmail(email);
    if (userData === undefined) {
        throw new Error("User does not exist");
    }
    houseData.uids.filter((uid) => {
        if (uid === userData.id) {
            //eslint-disable-next-line
            throw new Error("User already exists in house");
        }
        return uid;
    });
    const members = houseData.members;
    members.push({
        uid: userData.id,
        admin: false,
        name: userData.name,
    });
    await updateDoc(doc(db, "houses", houseId), {
        members: members,
        uids: [...houseData.uids, userData.id],
    });
    if (userData.houses === undefined) userData.houses = [];

    await updateDoc(doc(db, "users", userData.id), {
        houses: [...userData.houses, houseId],
    });
    return houseData.name;
}

async function getHouseDetails(houseId) {
    const docRef = doc(db, "houses", houseId);
    const docSnapshot = await getDoc(docRef);
    const data = docSnapshot.data();
    return data;
}

export { addHouse, getHouseDetails, addMember };
