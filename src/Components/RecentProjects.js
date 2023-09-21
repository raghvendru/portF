import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from "react";
import firebase from "../Config/firebaseConfig";
import PageLoader from "./PageLoader";

const RecentProjects = () => {
  const [recentProjectsSection, setRecentProjectsSection] = useState(null);
  const [recentProjectKeys, setRecentProjectKeys] = useState([]);

  useEffect(() => {
    const recentProjectsRef = firebase.database().ref(`RecentProjectsSection/`);
    recentProjectsRef.on("value", (response) => {
      const data = response.val();
      let rp = [];
      if (data) {
        setRecentProjectsSection(data);
        for (let i in data?.Projects) {
          rp.push(i);
        }
        setRecentProjectKeys(rp);
      }
    });
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (!recentProjectKeys.length) return null;
  return (
    <>
      {recentProjectsSection ? (
        <>
          <div id="recentProjects">
            <div className="container">
              <div className="row" style={{ marginTop: "-10rem" }}>
                <p>PORTFOLIO</p>
                <h3 className="text-center">RECENT PROJECTS</h3>
              </div>
              <Slider {...settings}>
                {recentProjectKeys.length
                  ? recentProjectKeys.map((recentProjectKey) => (
                      <React.Fragment key={recentProjectKey}>
                        <img
                          src={
                            recentProjectsSection?.Projects[recentProjectKey]
                              ?.ThumbnailURL
                          }
                          alt=""
                          className="bg-image img-thumbnail"
                        />
                        <h5>
                          {
                            recentProjectsSection?.Projects[recentProjectKey]
                              ?.Name
                          }
                        </h5>
                        <p>
                          {
                            recentProjectsSection?.Projects[recentProjectKey]
                              ?.Description
                          }
                        </p>
                        <button type="button" className="btn btn-lg">
                          <a
                            href={
                              recentProjectsSection?.Projects[recentProjectKey]
                                ?.Link
                            }
                            rel="noreferrer"
                            target="_blank"
                          >
                            View Project
                          </a>
                        </button>
                      </React.Fragment>
                    ))
                  : null}
              </Slider>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default RecentProjects;
