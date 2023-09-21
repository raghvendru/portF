import firebase from "../Config/firebaseConfig";
import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";
import { Link } from "react-router-dom";

const Footer = () => {
  const [footerSection, setFooterSection] = useState(null);
  const [socialKeys, setSocialKeys] = useState(null);

  useEffect(() => {
    const footerSectionRef = firebase.database().ref(`FooterSection/`);
    footerSectionRef.on("value", (response) => {
      const data = response.val();
      let sk = [];
      if (data) {
        setFooterSection(data);
        for (let i in data.SocialHandle) {
          sk = [...sk, i];
        }
        setSocialKeys(sk);
      }
    });
  }, []);
  return (
    <>
      {footerSection ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#393e46"
              fillOpacity="1"
              d="M0,320L48,314.7C96,309,192,299,288,282.7C384,267,480,245,576,224C672,203,768,181,864,186.7C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>

          <footer id="footer">
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="container">
                    <div className="row row-col-3">
                      {socialKeys ? (
                        <>
                          {socialKeys.map((socialKey) => (
                            <div className="col" key={socialKey}>
                              <a
                                href={
                                  footerSection?.SocialHandle[socialKey]?.Link
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i
                                  className={`${footerSection?.SocialHandle[socialKey]?.Icon} fa-3x`}
                                ></i>
                              </a>
                            </div>
                          ))}
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <h3>{footerSection?.ButtonHeading}</h3>

                  <Link
                    className="btn btn-outline-secondary"
                    type="button"
                    to="/contactUs"
                  >
                    Catch you in the mail
                  </Link>
                </div>
              </div>
              <br />
              <div className="row">
                <p>{footerSection?.FooterSectionContent}</p>
              </div>
            </div>
          </footer>
        </>
      ) : null}
    </>
  );
};

export default Footer;
