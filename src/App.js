import React, { useState, useEffect } from "react";

//Routing
import { Switch, Route } from "react-router-dom";

//Bootstrap + Manual Css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Components
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import AdminLogin from "./Pages/AdminLogin";
import AdminPanel from "./Pages/AdminPanel";
import NotFound from "./Pages/NotFound";

//Contexts
import UserContext from "./Contexts/UserContext";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//Created Hooks
import usePageLoader from "./Components/UsePageLoader";

//firebase configuration
import firebase from "./Config/firebaseConfig";
import ContactUs from "./Pages/ContactUs";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(0);
  const [loader, showLoader, hideLoader] = usePageLoader();
  const [resume, setResume] = useState("");

  useEffect(() => {
    const resumeRef = firebase.database().ref(`Resume`);
    resumeRef.on("value", (response) => {
      const data = response.val();
      if (data) {
        setResume(data?.ResumeURL);
      }
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider
        value={{
          user,
          setUser,
          isAdmin,
          setIsAdmin,
          loader,
          showLoader,
          hideLoader,
          resume,
        }}
      >
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/adminLogin" component={AdminLogin} />
          <Route path="/admin/adminPanel" component={AdminPanel} />
          <Route path="/contactUs" component={ContactUs} />
          <Route path="*" component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </>
  );
};

export default App;
