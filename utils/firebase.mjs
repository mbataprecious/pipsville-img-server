//Firebase Dependencies
import firebaseAdmin from 'firebase-admin';
// import serviceAccount from "../config/firebase_key.json"
//import { readFile } from 'fs/promises';



//const serviceAccount = JSON.parse(await readFile(new URL('../config/firebase_key.json', import.meta.url)));

const initiateFirebase = async() => {
  const res = await fetch('https://f004.backblazeb2.com/file/pipsville-bucket/firebase_key.json');
  const serviceAccount = await res.json();
  if (!res.ok) {
  throw new Error("failed to fetch firebase key")
}
  try {
    return firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    });
  } catch (err) {
    return firebaseAdmin.app();
  }
};

export default initiateFirebase;
