import {
    doc,
    setDoc,
    query,
    where,
    getDocs,
    collection,
    getDoc,
    orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
async function createUserNode(uid, email, name) {
    console.log("Creating user node...");
    await setDoc(doc(db, "users", uid), {
        email: email,
        name: name,
    })
        .then(() => {
            console.log("User node created.");
            return;
        })
        .catch((error) => {
            console.log(error);
            return;
        });
}

async function getHouseList() {
    const q = query(
        collection(db, "houses"),
        where(
            "uids",
            "array-contains",
            JSON.parse(localStorage.getItem("user")).uid
        )
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const houses = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        houses.push({ ...doc.data(), id: doc.id });
    });
    return filterHouseList(houses);
}

function filterHouseList(houses) {
    console.log(houses);
    const result = [];
    houses.forEach((house) => {
        house.members.forEach((member) => {
            if (member.uid === JSON.parse(localStorage.getItem("user")).uid) {
                result.push({
                    name: house.name,
                    admin: member.admin,
                    id: house.id,
                });
            }
        });
    });

    return result;
}

async function fetchUserInfoById(uid) {
    const docRef = doc(db, "users", uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        console.log("Document data:", docSnapshot.data());
        return docSnapshot.data();
    } else {
        console.log("No such document!");
        return null;
    }
}

export { createUserNode, getHouseList, fetchUserInfoById };
