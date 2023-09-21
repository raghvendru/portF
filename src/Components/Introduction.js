import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/UserContext";
import firebase from "../Config/firebaseConfig";
import PageLoader from "./PageLoader";
import { Link } from "react-router-dom";
const Introduction = () => {
  const context = useContext(UserContext);
  const [introductionSection, setIntroductionSection] = useState(null);

  useEffect(() => {
    const introductionRef = firebase.database().ref("IntroductionSection");
    introductionRef.on("value", (response) => {
      const data = response.val();
      if (data) {
        setIntroductionSection(data);
      }
    });
  }, []);
  if (!introductionSection) return <PageLoader />;
  return (
    <>
      {introductionSection ? (
        <>
          <div id="aboutMe">
            <div className="container innerAboutMe">
              <div className="row">
                <div className="col-md-3 col-sm-12"></div>
                <div className="col-md-6 col-sm-12">
                  <h4>{introductionSection?.Heading}</h4> <br />
                  <img
                    src={introductionSection?.PictureURL}
                    alt=""
                    className="img-thumbnail"
                  />{" "}
                  <br /> <br />
                  <p>{introductionSection?.Content}</p> <br />
                  <a
                    className="nav-link btn"
                    href={context?.resume}
                    style={{ zIndex: "1" }}
                    target="_blank"
                  >
                    Resume
                  </a>
                </div>
              </div>
              <div className="col-md-3 col-sm-12"></div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Introduction;
