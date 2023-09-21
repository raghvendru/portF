import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";
import firebase from "../Config/firebaseConfig";

const AdminSkills = () => {
  const context = useContext(UserContext);

  const [skillName, setSkillName] = useState("");
  const [skillRating, setSkillRating] = useState(0);
  const [skillDescription, setSkillDescription] = useState("");
  const [skillIcon, setSkillIcon] = useState("");
  const [skillSectionContent1, setSkillSectionContent1] = useState("");
  const [skillSectionContent2, setSkillSectionContent2] = useState("");
  const [skillSectionContent3, setSkillSectionContent3] = useState("");

  const handleAddSkill = async () => {
    if (skillName && skillRating) {
      await firebase
        .database()
        .ref(`SkillsSection/Skills/${Date.now()}`)
        .set({
          Name: skillName,
          Rating: skillRating,
          Description: skillDescription,
          Icon: skillIcon,
        })
        .then(() => {
          toast("Skill added successfully", { type: "success" });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }
    if (skillSectionContent1) {
      const skillSectionRef = firebase.database().ref("SkillsSection/");
      skillSectionRef
        .update({
          SkillSectionContent1: skillSectionContent1,
        })
        .then(() => {
          toast("Skill section content 1 has been updated successfully", {
            type: "success",
          });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }

    if (skillSectionContent2) {
      const skillSectionRef = firebase.database().ref("SkillsSection/");
      skillSectionRef
        .update({
          SkillSectionContent2: skillSectionContent2,
        })
        .then(() => {
          toast("Skill section content 2 has been updated successfully", {
            type: "success",
          });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }

    if (skillSectionContent3) {
      const skillSectionRef = firebase.database().ref("SkillsSection/");
      skillSectionRef
        .update({
          SkillSectionContent3: skillSectionContent3,
        })
        .then(() => {
          toast("Skill section content 3 has been updated successfully", {
            type: "success",
          });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }
    setSkillName("");
    setSkillRating(0);
    setSkillDescription("");
    setSkillIcon("");
    setSkillSectionContent1("");
    setSkillSectionContent2("");
    setSkillSectionContent3("");
  };
  if (!context.isAdmin) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <hr />
      <div className="AddNewSkill mt-4 p-5">
        <h1 className="text-center">Add new skill</h1>

        <div className="row">
          <div className="col-8">
            <label for="skillName">Skill Name *</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter skill name here..."
              aria-label="default input example"
              id="skillName"
              value={skillName}
              onChange={(e) => {
                setSkillName(e.target.value);
              }}
            />
          </div>
          <div className="col-4">
            <label for="skillRating">Skill Rating *</label> {skillRating}
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              id="skillRating"
              value={skillRating}
              onChange={(e) => {
                setSkillRating(e.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-8">
            <label for="skillDescription">Description</label>
            <input
              disabled={skillName && skillRating ? false : true}
              className="form-control"
              type="text"
              placeholder="Description..."
              aria-label="default input example"
              id="skillDescription"
              value={skillDescription}
              onChange={(e) => {
                setSkillDescription(e.target.value);
              }}
            />
          </div>

          <div className="col-md-4">
            <label for="skillIcon">Skill Icon</label>
            <input
              disabled={skillName && skillRating ? false : true}
              className="form-control"
              type="text"
              placeholder="Font awesome icon class name..."
              aria-label="default input example"
              id="skillIcon"
              value={skillIcon}
              onChange={(e) => {
                setSkillIcon(e.target.value);
              }}
            />
          </div>
        </div>
        <br />

        <div className="input-group">
          <span className="input-group-text">Content 1</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={skillSectionContent1}
            onChange={(e) => {
              setSkillSectionContent1(e.target.value);
            }}
          ></textarea>
        </div>
        <br />

        <div className="input-group">
          <span className="input-group-text">Content 2</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={skillSectionContent2}
            onChange={(e) => {
              setSkillSectionContent2(e.target.value);
            }}
          ></textarea>
        </div>
        <br />

        <div className="input-group">
          <span className="input-group-text">Content 3</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={skillSectionContent3}
            onChange={(e) => {
              setSkillSectionContent3(e.target.value);
            }}
          ></textarea>
        </div>
        <br />

        <button
          disabled={
            (skillName && skillRating) ||
            skillSectionContent1 ||
            skillSectionContent2 ||
            skillSectionContent3
              ? false
              : true
          }
          type="button"
          className="btn btn-success"
          onClick={() => {
            handleAddSkill();
          }}
        >
          Add Skill
        </button>
      </div>
    </>
  );
};

export default AdminSkills;
