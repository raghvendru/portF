import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";
import firebase from "../Config/firebaseConfig";

const AdminHeroSection = () => {
  const context = useContext(UserContext);

  const [file, setFile] = useState(null);
  const [heroName, setHeroName] = useState("");
  const [heroSectionContent, setHeroSectionContent] = useState("");

  const handleAddHeroSection = async () => {
    const heroSectionRef = firebase.database().ref("HeroSection/");

    if (heroName) {
      heroSectionRef
        .update({
          HeroName: heroName,
        })
        .then(() => {
          setHeroName("");
          toast("Hero name has been updated successfully", {
            type: "success",
          });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }

    if (heroSectionContent) {
      heroSectionRef
        .update({
          Content: heroSectionContent,
        })
        .then(() => {
          setHeroSectionContent("");
          toast("Content of the hero section has been updated successfully", {
            type: "success",
          });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }
  };

  const handleFileChange = (files) => {
    if (files) {
      setFile(files[0]);
    }
  };

  const handleFileUpload = async () => {
    const bucketName = "myPictures";
    const storageRef = firebase
      .storage()
      .ref(`${bucketName}/HeroSectionPicture`);

    const uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      firebase
        .storage()
        .ref(`${bucketName}`)
        .child("HeroSectionPicture")
        .getDownloadURL()
        .then((url) => {
          if (url) {
            const heroSectionRef = firebase.database().ref("HeroSection/");
            heroSectionRef
              .update({
                PictureURL: url,
              })
              .then(() => {
                toast("Picture has been uploaded successfully", {
                  type: "success",
                });
              })
              .catch((err) => {
                toast(err.message, { type: "error" });
              });
          }
        });
    });
  };

  if (!context.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <hr />
      <div className="AddHeroSection mt-4 p-5">
        <h1 className="text-center">Hero section</h1>
        <label for="heroName">Hero Name</label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter hero name..."
          aria-label="default input example"
          id="heroName"
          value={heroName}
          onChange={(e) => {
            setHeroName(e.target.value);
          }}
        />
        <br />

        <div className="input-group">
          <span className="input-group-text">Hero Section Content</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={heroSectionContent}
            onChange={(e) => {
              setHeroSectionContent(e.target.value);
            }}
          ></textarea>
        </div>
        <br />
        <button
          disabled={heroName || heroSectionContent ? false : true}
          type="button"
          className="btn btn-success"
          onClick={() => {
            handleAddHeroSection();
          }}
        >
          Update Detail/s
        </button>
        <br />
        <br />

        <div className="mb-3">
          <div className="row">
            <div className="col-md-9">
              <label for="heroSection" className="form-label">
                Upload Image
              </label>
              <input
                className="form-control"
                type="file"
                id="heroSection"
                onChange={(e) => {
                  handleFileChange(e.target.files);
                }}
              />
            </div>
            <div className="col-md-3">
              <br />
              <button
                disabled={file ? false : true}
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  handleFileUpload();
                }}
              >
                Upload picture
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeroSection;
