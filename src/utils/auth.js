import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
}

function register(email, password) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
}

function logout() {
    const auth = getAuth();
    localStorage.removeItem("user");
    return signOut(auth);
}

export { login, register, logout };
