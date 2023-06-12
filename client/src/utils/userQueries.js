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
    await setDoc(doc(db, "users", uid), {
        email: email,
        name: name,
    })
        .then(() => {
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
    const houses = [];
    querySnapshot.forEach((doc) => {
        houses.push({ ...doc.data(), id: doc.id });
    });
    return filterHouseList(houses);
}

function filterHouseList(houses) {
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
        return docSnapshot.data();
    } else {
        return null;
    }
}

async function fetchUserInfoByEmail(email) {
    const q = query(collection(db, "users"), where("email", "==", `${email}`));

    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
    });
    return users[0];
}

export {
    createUserNode,
    getHouseList,
    fetchUserInfoById,
    fetchUserInfoByEmail,
};
