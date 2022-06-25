//Firebase Dependencies
import firebaseAdmin from 'firebase-admin';
// import serviceAccount from "../config/firebase_key.json"

import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(await readFile(new URL('../config/firebase_key.json', import.meta.url)));

const initiateFirebase = () => {
  try {
    return firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    });
  } catch (err) {
    return firebaseAdmin.app();
  }
};

export default initiateFirebase;
