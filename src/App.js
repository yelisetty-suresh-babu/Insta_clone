import insta from "./images/insta.png";
import Posts from "./components/Posts";
import Caption from "./captionUpload";

import { useEffect, useState } from "react";
import { db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { Button, Modal, Box, Input } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [opensignIn, setopensignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const handleClose = () => setOpen(false);

  const ref = collection(db, "posts");
  useEffect(() => {
    
    onSnapshot(ref, (data) => {
      setPosts(data.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authuser) => {
      if (authuser) {
        console.log("logged in");
        setUser(authuser);
      } else {
        console.log("not logged in");
        setUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, [user, username]);

  const signUp = (e) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {

        const errorMessage = error.message;
        alert(errorMessage);
      });
    setopensignIn(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg outline-none  object-contain ">
          <form action="" className="flex flex-col items-center gap-y-4">
            <center>
              <img src={insta} className="h-8 object-contain" alt="" />
            </center>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              className="w-full"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              className="w-full"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={opensignIn}
        onClose={() => setopensignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg outline-none  object-contain ">
          <form action="" className="flex flex-col items-center gap-y-4">
            <center>
              <img src={insta} className="h-8 object-contain" alt="" />
            </center>

            <Input
              className="w-full"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
          </form>
        </Box>
      </Modal>

      <div className="flex justify-between p-6  top-0 sticky w-full bg-white border-b-2 border-black object-contain rounded-md ">
        <img src={insta} className="h-8 object-contain self-start" alt="" />
        <div>
          {user ? (
            <Button
              onClick={() => {
                auth.signOut();
              }}
            >
              Logout
            </Button>
          ) : (
            <div className=" ">
              <button
                className="mr-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white pr-2 pl-2 p-1"
                onClick={() => setOpen(true)}
              >
                SignUp
              </button>
              <button
                className="ml-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white pr-2 pl-2 p-1"
                onClick={() => setopensignIn(true)}
              >
                SignIn
              </button>
            </div>
          )}
        </div>
      </div>


      {posts.map(({ id, post }) => {
        return (
          <Posts
            key={id}
            temp={id}
            name={post.name}
            caption={post.caption}
            url={post.url}
            user={user}
          />
        );
      })}
      {user?.displayName ? (
        <div className="gap-y-4">
          <Caption username={user.displayName} />
        </div>
      ) : (
        <h3 className="text-center m-3 font-extrabold">login to upload</h3>
      )}
    </div>
  );
}

export default App;
