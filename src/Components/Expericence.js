import Typical from "react-typical";
import React, { useEffect, useState } from "react";
import firebase from "../Config/firebaseConfig";
import PageLoader from "./PageLoader";
import { Link } from "react-router-dom";

const Expericence = () => {
  const [experienceSection, setExperienceSection] = useState(null);
  const [experienceKeys, setExperienceKeys] = useState(null);

  useEffect(() => {
    const experienceSectionRef = firebase.database().ref(`ExperienceSection/`);
    experienceSectionRef.on("value", (response) => {
      const data = response.val();
      let es = [];
      if (data) {
        setExperienceSection(data);
        for (let i in data?.Experiences) {
          es = [...es, i];
        }
        setExperienceKeys(es);
      }
    });
  }, []);
  return (
    <>
      {experienceSection ? (
        <>
          <div class="container-fluid mt-5 py-5" id="experience">
            <div class="container mt-5">
              <div class="position-relative d-flex align-items-center justify-content-center">
                <h1 class="display-1 text-uppercase text-white"></h1>
                <h1 class="position-absolute text-uppercase p-4 text-white">
                  {experienceSection?.ExperienceSectionHeading}
                </h1>
              </div>
              <div class="row align-items-center">
                <div class="col-2"></div>
                <div class="col-8 mt-5">
                  <div class="border-left border-primary pt-2 pl-4 ml-2">
                    {experienceKeys
                      ? experienceKeys.map((experienceKey) => (
                          <div class="position-relative ex-me mb-4">
                            <i
                              class="far fa-dot-circle text-primary position-absolute text-white"
                              style={{ top: "2px", left: "-35px" }}
                            ></i>
                            <h5 class="font-weight-bold mb-1 text-white">
                              {
                                experienceSection?.Experiences[experienceKey]
                                  ?.Designation
                              }
                            </h5>
                            <p class="mb-2">
                              <strong>
                                {
                                  experienceSection?.Experiences[experienceKey]
                                    ?.OrganizationName
                                }
                              </strong>{" "}
                              |{" "}
                              <small>
                                {" "}
                                {
                                  experienceSection?.Experiences[experienceKey]
                                    ?.TimeDuration
                                }
                              </small>
                            </p>
                            <p className="text-white">
                              {
                                experienceSection?.Experiences[experienceKey]
                                  ?.Description
                              }
                            </p>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                <div class="col-2"></div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Expericence;
