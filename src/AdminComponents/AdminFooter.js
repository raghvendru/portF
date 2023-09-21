import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";
import firebase from "../Config/firebaseConfig";

const AdminFooter = () => {
  const context = useContext(UserContext);

  const [socialLink, setSocialLink] = useState("");
  const [buttonHeading, setButtonHeading] = useState("");
  const [socialIcon, setSocialIcon] = useState("");
  const [footerSectionContent, setFooterSectionContent] = useState("");

  const handleAddSocialHandle = async () => {
    if (socialLink && socialIcon) {
      await firebase
        .database()
        .ref(`FooterSection/SocialHandle/${Date.now()}`)
        .set({
          Link: socialLink,
          Icon: socialIcon,
        })
        .then(() => {
          setSocialLink("");
          setSocialIcon("");
          toast("Social handle added successfully", { type: "success" });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }

    if (footerSectionContent) {
      const footerSectionRef = firebase.database().ref("FooterSection/");
      footerSectionRef
        .update({
          FooterSectionContent: footerSectionContent,
        })
        .then(() => {
          setFooterSectionContent("");
          toast("Content for footer section has updated successfully", {
            type: "success",
          });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }
    if (buttonHeading) {
      const footerSectionRef = firebase.database().ref("FooterSection/");
      footerSectionRef
        .update({
          ButtonHeading: buttonHeading,
        })
        .then(() => {
          setButtonHeading("");
          toast("Button heading section has updated successfully", {
            type: "success",
          });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }
  };

  if (!context.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <hr />
      <div className="AddNewSocialHandle mt-4 p-5">
        <h1 className="text-center">Social handle</h1>

        <div className="row">
          <div className="col-8">
            <label for="socialIcon">Social Icon</label>
            <input
              className="form-control"
              type="text"
              placeholder="Font awesome icon class name..."
              aria-label="default input example"
              id="socialIcon"
              value={socialIcon}
              onChange={(e) => {
                setSocialIcon(e.target.value);
              }}
            />
          </div>
          <div className="col-4">
            <label for="socialLink">Social Link</label>
            <input
              className="form-control"
              type="text"
              placeholder="Social link..."
              aria-label="default input example"
              id="socialLink"
              value={socialLink}
              onChange={(e) => {
                setSocialLink(e.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text">Footer Content</span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={footerSectionContent}
                onChange={(e) => {
                  setFooterSectionContent(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="col-md-4">
            <label for="buttonHeading">Button Heading</label>
            <input
              className="form-control"
              type="text"
              placeholder="Button heading..."
              aria-label="default input example"
              id="buttonHeading"
              value={buttonHeading}
              onChange={(e) => {
                setButtonHeading(e.target.value);
              }}
            />
          </div>
        </div>
        <br />

        <br />
        <button
          disabled={
            (socialIcon && socialLink) || footerSectionContent || buttonHeading
              ? false
              : true
          }
          type="button"
          className="btn btn-success"
          onClick={() => {
            handleAddSocialHandle();
          }}
        >
          Add Social Handle
        </button>
      </div>
    </>
  );
};

export default AdminFooter;
