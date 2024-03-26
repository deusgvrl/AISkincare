import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyAVL-FLlruTvNCjaLO-qmJk_PVlc1mSmzo",
    authDomain: "skincare-recommendation-c7042.firebaseapp.com",
    projectId: "skincare-recommendation-c7042",
    storageBucket: "skincare-recommendation-c7042.appspot.com",
    messagingSenderId: "1085825905138",
    appId: "1:1085825905138:web:ca3f53f23ca2d859283b6b",
    measurementId: "G-Z78GPNZ23K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
