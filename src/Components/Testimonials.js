import { useState, useEffect } from "react";
import firebase from "../Config/firebaseConfig";
import PageLoader from "./PageLoader";

const Testimonials = () => {
  const [testimonialsSection, setTestimonialsSection] = useState(null);
  const [testimonialKeys, setTestimonialKeys] = useState([]);

  useEffect(() => {
    const testimonialsRef = firebase.database().ref(`TestimonialSection/`);
    testimonialsRef.on("value", (response) => {
      const data = response.val();
      let ts = [];
      if (data) {
        setTestimonialsSection(data);
        for (let i in data?.Testimonials) {
          ts.push(i);
        }
        setTestimonialKeys(ts);
      }
    });
  }, []);

  return (
    <>
      {testimonialsSection ? (
        <>
          <div className="client">
            <div className="client-heading">
              <span className="mb-4">Testimonial</span>
              <h3>CLIENT'S SAY</h3>
            </div>
            <div className="c-box-container">
              {testimonialKeys.length
                ? testimonialKeys.map((testimonialKey) => (
                    <div className="client-box" key={testimonialKey}>
                      <h5>
                        {
                          testimonialsSection?.Testimonials[testimonialKey]
                            ?.Name
                        }
                      </h5>
                      <img
                        src={
                          testimonialsSection?.Testimonials[testimonialKey]
                            ?.ClientPictureURL
                        }
                        alt="Client's Profile"
                      />
                      <br />

                      <div className="star">
                        {testimonialsSection?.Testimonials[testimonialKey]
                          ?.Rating
                          ? testimonialsSection?.Testimonials[
                              testimonialKey
                            ]?.Rating.map((i, index) => (
                              <i
                                key={index}
                                className={
                                  testimonialsSection?.Testimonials[
                                    testimonialKey
                                  ]?.Rating[index]
                                    ? "fas fa-star"
                                    : "far fa-star"
                                }
                              ></i>
                            ))
                          : null}
                      </div>
                      <p>
                        {
                          testimonialsSection?.Testimonials[testimonialKey]
                            ?.Message
                        }
                      </p>
                      <a href="#">Read More...</a>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Testimonials;
