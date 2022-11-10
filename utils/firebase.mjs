//Firebase Dependencies
import { initializeApp,cert } from "firebase-admin/app";
import "firebase/firestore"
import config from "../config/config.mjs";
// import serviceAccount from "../config/firebase_key.json"
//import { readFile } from 'fs/promises';



//const serviceAccount = JSON.parse(await readFile(new URL('../config/firebase_key.json', import.meta.url)));

const initiateFirebase = async() => { 
   try {
  const res = await fetch(config.credential);
  const serviceAccount = await res.json();
  console.log(serviceAccount)
  if (!res.ok) {
  throw new Error("failed to fetch firebase key")
}
    return initializeApp({
      credential: cert(serviceAccount),
      storageBucket:"gs://pipsvile.appspot.com"
    });
  } catch (err) {
      console.log("initalization failed")
  }
};

export default initiateFirebase;
