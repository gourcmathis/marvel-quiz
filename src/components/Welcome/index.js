import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Logout from "../Logout";
import Quiz from "../Quiz";
import { auth, user } from "../Firebase/firebaseConfig";
import { getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const Welcome = () => {
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let listener = onAuthStateChanged(auth, (user) => {
      user ? setUserSession(user) : navigate("/");
    });

    if (!!userSession) {
      const colRef = user(userSession.uid);
      getDoc(colRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const docData = snapshot.data();
            setUserData(docData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      listener();
    };
  }, [navigate, userSession]);

  const display =
    userSession === null ? (
      <Loader
        loadingMsg={"Loading ..."}
        styling={{ textAlign: "center", color: "#FFFFFF" }}
      />
    ) : (
      <div className="quiz-bg">
        <div className="container">
          <Logout />
          <Quiz userData={userData} />
        </div>
      </div>
    );

  return <>{display}</>;
};

export default Welcome;
