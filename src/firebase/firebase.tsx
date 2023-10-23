import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDH0btqn36w2Gy7_c2TAqsUg4a-pmxgL7g",
    authDomain: "lolmasterygg-server.firebaseapp.com",
    projectId: "lolmasterygg-server",
    storageBucket: "lolmasterygg-server.appspot.com",
    messagingSenderId: "215447831182",
    appId: "1:215447831182:web:58d81a92f2e5bbe1813fdf",
    measurementId: "G-YCH585NWK6"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig)

// Firebase 객체 저장
export const db = getFirestore(app)