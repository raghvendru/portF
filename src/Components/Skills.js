import firebase from "../Config/firebaseConfig";
import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

const Skills = () => {
  const [skillSection, setSkillSection] = useState(null);
  const [skillKeys, setSkillKeys] = useState(null);

  useEffect(() => {
    const skillSectionRef = firebase.database().ref(`SkillsSection/`);
    skillSectionRef.on("value", (response) => {
      const data = response.val();
      let sk = [];
      if (data) {
        setSkillSection(data);
        for (let i in data.Skills) {
          sk = [...sk, i];
        }
        setSkillKeys(sk);
      }
    });
  }, []);
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#393e46"
          fillOpacity="1"
          d="M0,0L30,21.3C60,43,120,85,180,90.7C240,96,300,64,360,58.7C420,53,480,75,540,106.7C600,139,660,181,720,181.3C780,181,840,139,900,138.7C960,139,1020,181,1080,181.3C1140,181,1200,139,1260,149.3C1320,160,1380,224,1410,256L1440,288L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>

      <div className="skills">
        <div className="container">
          <div className="row">
            {skillSection ? (
              <>
                <div
                  className="col-md-6 skillsText "
                  style={{
                    paddingRight: "5rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h1 style={{ color: "whitesmoke" }}>
                    SKILLS <i className="fas fa-fist-raised"></i>
                  </h1>
                  <p>{skillSection?.SkillSectionContent1}</p>
                  <p>{skillSection?.SkillSectionContent2}</p>
                  <p>{skillSection?.SkillSectionContent3}</p>
                </div>
                <div
                  className="col-md-6 skillsList"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {skillKeys ? (
                    <>
                      {skillKeys.map((skillKey) => (
                        <div key={skillKey}>
                          <h6 style={{ color: "whitesmoke" }}>
                            <i
                              className={skillSection?.Skills[skillKey]?.Icon}
                            ></i>{" "}
                            {skillSection?.Skills[skillKey]?.Name}
                          </h6>
                          <p
                            style={{
                              fontWeight: "bolder",
                            }}
                          >
                            {skillSection?.Skills[skillKey]?.Description}
                          </p>
                          <div className="progress">
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{
                                width: `${skillSection?.Skills[skillKey]?.Rating}%`,
                              }}
                              aria-valuenow="10"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>{" "}
                          <br />
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#393e46"
          fillOpacity="1"
          d="M0,128L120,112C240,96,480,64,720,69.3C960,75,1200,117,1320,138.7L1440,160L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
    </>
  );
};

export default Skills;
