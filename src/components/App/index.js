import "../../App.css";
import ErrorPage from "../ErrorPage";
import Footer from "../Footer";
import Header from "../Header";
import Landing from "../Landing";
import Login from "../Login";
import Signup from "../Signup";
import Welcome from "../Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgetPassword from "../ForgetPassword";
import { IconContext } from "react-icons/lib";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <Header />

        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/marvel-quiz" element={<Landing />} />
          <Route path="/marvel-quiz/login" element={<Login />} />
          <Route path="/marvel-quiz/signup" element={<Signup />} />
          <Route path="/marvel-quiz/welcome" element={<Welcome />} />
          <Route
            path="/marvel-quiz/forgetpassword"
            element={<ForgetPassword />}
          />
        </Routes>

        <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
