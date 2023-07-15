import React, { useState } from "react";
import { Button, colors } from "@mui/material";
import { collection, setDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { v4 } from "uuid";
// import { db } from "./firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAi-5kqC2n63XEzwFxVrbz2HBL7nna8Asg",
  authDomain: "instagram-clone-46d8e.firebaseapp.com",
  projectId: "instagram-clone-46d8e",
  storageBucket: "instagram-clone-46d8e.appspot.com",
  messagingSenderId: "322431546983",
  appId: "1:322431546983:web:2e9ff11b42b48700ac86c2",
  measurementId: "G-2PKB6FB54X",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

function Caption({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    if (image === null) {
      return;
    }
    const imageRef = ref(storage, `images/${image.name + v4()}`);

    const upload = uploadBytesResumable(imageRef, image);
    upload.on(
      "state_changed",
      (snap) => {
        const p = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(p);
      },
      (e) => {},
      () => {
        getDownloadURL(upload.snapshot.ref).then((link) => {

          setProgress(0);

          setDoc(doc(collection(db, "posts")), {
            timestamp: serverTimestamp(),
            caption: caption,
            name: username,
            url: link,
          });
        });
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 border-t-2 border-slate-400">
      <progress value={progress} max="100" className="m-2 w-56 rounded-lg" />

      <input
        type="text"
        placeholder="Enter the caption...."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="m-3 "
      />
      <input type="file" onChange={handleChange} className="-right-4 " />
      <button
        onClick={handleUpload}
        className="border-black text-white bg-blue-600 p-1 px-2 w-32 rounded-lg"
      >
        Upload
      </button>
    </div>
  );
}

export default Caption;
