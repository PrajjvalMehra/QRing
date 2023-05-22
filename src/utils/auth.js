import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
}

function register(email, password) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
}

export { login, register };
