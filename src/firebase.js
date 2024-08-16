import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA_AkTG5X87k3o7Dd53QlLr_zhyQywdnHs",
    authDomain: "majang-78282.firebaseapp.com",
    projectId: "majang-78282",
    storageBucket: "majang-78282.appspot.com",
    messagingSenderId: "363458788768",
    appId: "1:363458788768:web:ae394e64654feb7f8d78c5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };