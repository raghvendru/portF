import emailjs from "emailjs-com";
import React from "react";
import { toast } from "react-toastify";

export default function ContactUs() {
  async function sendEmail(e) {
    e.preventDefault();

    await emailjs
      .sendForm(
        "service_osqzrxt",
        "template_t5o9gcr",
        e.target,
        "5GTxGa9IhP4Xpa3Ig"
      )
      .then(
        (result) => {
          toast("Your message has successfully reached to me !", {
            type: "success",
          });
        },
        (error) => {
          console.log(error)
          toast("Something went wrong", { type: "error" });
        }
      );
    e.target.reset();
  }

  return (
    <div>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={(e) => {
            sendEmail(e);
          }}
        >
          <div className="row">
            <div className="col-md-2 col-sm-1"></div>
            <div className="col-md-8 col-sm-10">
              <div className="row pt-5 ">
                <h1 className="p-2 text-center">Contact Me</h1>
                <div className="form-group ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    required
                  />
                </div>
                <div className="form-group pt-2 ">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email"
                    required
                  />
                </div>
                <div className="form-group pt-2 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <textarea
                    className="form-control"
                    id=""
                    cols="30"
                    rows="8"
                    placeholder="Your message"
                    name="message"
                    required
                  ></textarea>
                </div>
                <div className="pt-3 ">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Send Message"
                  ></input>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-sm-1"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
