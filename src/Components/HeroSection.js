import Typical from "react-typical";
import React, { useEffect, useState } from "react";
import firebase from "../Config/firebaseConfig";
import PageLoader from "./PageLoader";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [heroSection, setHeroSection] = useState(null);

  useEffect(() => {
    const heroSectionRef = firebase.database().ref("HeroSection");
    heroSectionRef.on("value", (response) => {
      const data = response.val();
      if (data) {
        setHeroSection(data);
      }
    });
  }, []);

  if (!heroSection) return <PageLoader />;

  return (
    <>
      {heroSection ? (
        <>
          <div id="heroSection ">
            <section className="introduction">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text ">
                    <h1 className="myName">Hi</h1>
                    <h1 className="myName">
                      i'm{" "}
                      <span
                        className="myName"
                        style={{ color: "indianred", fontSize: "3rem" }}
                      >
                        {heroSection?.HeroName}
                      </span>{" "}
                      and i'm a
                    </h1>
                    <h1>
                      <span>
                        <Typical
                          steps={[
                            "Developer",
                            200,
                            "Freelancer",
                            300,
                            "Problem Solver",
                            500,
                            "Designer",
                            100,
                          ]}
                          loop={Infinity}
                          wrapper="p"
                        />
                      </span>
                    </h1>
                    <p>{heroSection?.Content}</p>
                    <Link
                      className="nav-link btn"
                      to="/contactUs"
                      style={{ zIndex: "1" }}
                    >
                      Hire Me
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <img
                      src={heroSection?.PictureURL}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : null}
    </>
  );
};

export default HeroSection;
