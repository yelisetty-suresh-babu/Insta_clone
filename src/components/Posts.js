import React, { useEffect, useState } from "react";
// import face from "../images/face.png";
import { Avatar } from "@mui/material";
import {
  onSnapshot,
  ref,
  doc,
  addDoc,
  collection,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Logo from "./logo";

function Posts({ postid, temp, name, caption, url, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(true);
  const ref = collection(db, "posts", temp, "comments");

  useEffect(() => {
    onSnapshot(ref, (data) => {
      data.docs.map((doc) => {
        setComments(data.docs.map((doc) => ({ values: doc.data() })));
      });
    });
  }, []);
  function postComment(e) {
    e.preventDefault();
    console.log(user.displayName);

    try {
      addDoc(collection(db, "posts", temp, "comments"), {
        comment: comment,
        name: user.displayName,
      });
    } catch (e) {
      console.log(e);
    }
    setComment('');
  }
  return (
    <div className="m-auto mb-8 mt-5 border-slate-600 shadow-xl p-4 max-w-[700px] rounded-lg">
      <div className="avatar flex gap-x-2 mb-3 items-center">
        <Avatar className="outline" alt="suresh" src="" />
        <h3 className="">{name}</h3>
      </div>
      <img
        className="w-full object-contain  pb-5 pt-5"
        src={url}
        alt="profile post"
      />
      <div className="flex justify-between">
        <h4 className="font-normal p-3 object-contain">
          <span className="font-bold">{name}</span> : {caption}
          <div hidden={show}>
            {comments?.map(({ values }) => {
              return (
                <p key={Math.random()}>
                  <strong>{values.name}</strong> : {values.comment}
                </p>
              );
            })}
          </div>
        </h4>
        {comments.length !== 0 ? (
          <button onClick={() => setShow((v) => v ^ true)} className=" h-4">
          ▼
          </button>
        ) : null}
      </div>

      {user ? (
        <form className="flex flex-col items-start">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-2 m-2 p-2 rounded-md"
          />
          <button
            className="bg-blue-500 w-[60px] ml-4 rounded-md left-6 text-white p-1 m-2"
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      ) : null}
    </div>
  );
}

export default Posts;
