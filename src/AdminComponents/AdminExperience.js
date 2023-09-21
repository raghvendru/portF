import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";
import firebase from "../Config/firebaseConfig";

const AdminExperience = () => {
  const context = useContext(UserContext);

  const [experienceSectionHeading, setExperienceSectionHeading] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [designation, setDesignation] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleAddExperience = async () => {
    if (organizationName && description && timeDuration && designation) {
      await firebase
        .database()
        .ref(`ExperienceSection/Experiences/${Date.now()}`)
        .set({
          OrganizationName: organizationName,
          Designation: designation,
          TimeDuration: timeDuration,
          Description: description,
        })
        .then(() => {
          toast("Experience added successfully", { type: "success" });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }
    if (experienceSectionHeading) {
      const experienceSectionRef = firebase
        .database()
        .ref("ExperienceSection/");
      experienceSectionRef
        .update({
          ExperienceSectionHeading: experienceSectionHeading,
        })
        .then(() => {
          toast("Experience heading updated successfully", { type: "success" });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }
    setExperienceSectionHeading("");
    setOrganizationName("");
    setTimeDuration("");
    setDescription("");
    setDesignation("");
  };

  if (!context.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <hr />
      <div className="AddNewSocialHandle mt-4 p-5">
        <h1 className="text-center">Experience Section</h1>

        <div className="row">
          <div className="col-8">
            <label for="designation">Designation *</label>
            <input
              className="form-control"
              type="text"
              placeholder="Designation..."
              aria-label="default input example"
              id="designation"
              value={designation}
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
            />
          </div>
          <div className="col-4">
            <label for="timeDuration">Time duration *</label>
            <input
              className="form-control"
              type="text"
              placeholder="Time duration..."
              aria-label="default input example"
              id="timeDuration"
              value={timeDuration}
              onChange={(e) => {
                setTimeDuration(e.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text">Description *</span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="col-md-4">
            <label for="organizationName">Organization Name *</label>
            <input
              className="form-control"
              type="text"
              placeholder="Organization Name..."
              aria-label="default input example"
              id="organizationName"
              value={organizationName}
              onChange={(e) => {
                setOrganizationName(e.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <label for="experienceSectionHeading">Experience heading</label>
        <input
          className="form-control"
          type="text"
          placeholder="Experience heading..."
          aria-label="default input example"
          id="experienceSectionHeading"
          value={experienceSectionHeading}
          onChange={(e) => {
            setExperienceSectionHeading(e.target.value);
          }}
        />

        <br />
        <button
          disabled={
            (designation && timeDuration && description && organizationName) ||
            experienceSectionHeading
              ? false
              : true
          }
          type="button"
          className="btn btn-success"
          onClick={() => {
            handleAddExperience();
          }}
        >
          Add Experience
        </button>
      </div>
    </>
  );
};

export default AdminExperience;
