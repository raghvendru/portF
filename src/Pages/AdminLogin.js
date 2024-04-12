import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

import firebase from "firebase/app";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const handleSignIn = async () => {
    context.showLoader();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        context.setIsAdmin(1);
        context.hideLoader();
      })
      .catch((error) => {
        console.log(error)
        toast(error.message, { type: "error", autoClose: 15000 });
        context.hideLoader();
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (forgotEmail)
      firebase
        .auth()
        .sendPasswordResetEmail(forgotEmail)
        .then(toast("Email has been sent succesfully !", { type: "success" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  if (context.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div
        className="row cover adminLogin"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-md-4 col-sm-1"></div>
        <div className="col-md-4 mt-4 col-sm-10">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center">Admin Login</h4>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Log In
                </button>
              </form>

              <br />
              <p>
                <div className="row">
                  <div className="col-md-12">
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                    >
                      forgotten password ?
                    </Link>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              A password reset link will be sent to your given
                              mail !
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <label htmlFor="email" className="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                              />
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={(e) => {
                                handleForgotPassword(e);
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-1"></div>
      </div>

      {context.loader}
    </>
  );
};

export default AdminLogin;
