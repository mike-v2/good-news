import { initializeApp, applicationDefault, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import firebase from 'firebase/compat/app';

const serviceAccount = require("../keyfile/goodnews-firebase.json");

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const firestoreDB = getFirestore();

export { firestoreDB }
