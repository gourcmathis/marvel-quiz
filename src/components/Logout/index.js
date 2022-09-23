import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (checked) {
      signOut(auth).then(() => {
        navigate("/", { replace: true });
      });
    }
  }, [checked, navigate]);

  const checkHandler = () => {
    setChecked(!checked);
  };  

  return (
    <div className="logoutContainer">
      <ReactTooltip place="left" type="warning" effect="solid" />
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={checkHandler} />
        <span data-tip="Déconnexion" className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
