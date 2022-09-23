import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const data = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setLoginData({ ...data });
        navigate("/welcome", { replace: true });
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  const { email, password } = loginData;

  const btn =
    email === "" || password.length < 6 ? (
      <button disabled>Connexion</button>
    ) : (
      <button>Connexion</button>
    );

  // gestion erreurs
  const errorMsg = error !== "" && <span>{error.message}</span>;
  const navigate = useNavigate();

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Nouveau sur Marvel Quiz? S'inscrire maintenant.
              </Link>
              <br/>
              <Link className="simpleLink" to="/forgetpassword">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
