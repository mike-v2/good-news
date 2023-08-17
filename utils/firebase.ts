import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require("../keyfile/goodnews-firebase.json");

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const firestoreDB = getFirestore();

export { firestoreDB }
