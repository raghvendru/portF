import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";
import firebase from "../Config/firebaseConfig";

const AdminIntroduction = () => {
  const context = useContext(UserContext);

  const [file, setFile] = useState(null);
  const [introductionHeading, setIntroductionHeading] = useState("");
  const [introductionContent, setIntroductionContent] = useState("");

  const handleAddIntroduction = async () => {
    const introductionSectionRef = firebase
      .database()
      .ref("IntroductionSection/");

    if (introductionHeading) {
      introductionSectionRef
        .update({
          Heading: introductionHeading,
        })
        .then(() => {
          setIntroductionHeading("");
          toast("Introduction heading has been updated successfully", {
            type: "success",
          });
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    }

    if (introductionContent) {
      introductionSectionRef
        .update({
          Content: introductionContent,
        })
        .then(() => {
          setIntroductionContent("");
          toast("Introduction content has been updated successfully", {
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
    if (file) {
      const bucketName = "myPictures";
      const storageRef = firebase
        .storage()
        .ref(`${bucketName}/IntroductionPicture`);
      const uploadTask = storageRef.put(file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
        firebase
          .storage()
          .ref(`${bucketName}`)
          .child("IntroductionPicture")
          .getDownloadURL()
          .then((url) => {
            if (url) {
              const introductionSectionRef = firebase
                .database()
                .ref("IntroductionSection/");
              introductionSectionRef
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
    } else {
      toast("Please choose the file", { type: "error" });
    }
  };

  if (!context.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <hr />
      <div className="AddIntroduction mt-4 p-5">
        <h1 className="text-center">Introduction Section</h1>
        <label for="introductionHeading">Introduction Heading</label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter introduction heading here..."
          aria-label="default input example"
          id="introductionHeading"
          value={introductionHeading}
          onChange={(e) => {
            setIntroductionHeading(e.target.value);
          }}
        />
        <br />

        <div className="input-group">
          <span className="input-group-text">Introduction Content</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={introductionContent}
            onChange={(e) => {
              setIntroductionContent(e.target.value);
            }}
          ></textarea>
        </div>
        <br />
        <button
          disabled={introductionHeading || introductionContent ? false : true}
          type="button"
          className="btn btn-success"
          onClick={() => {
            handleAddIntroduction();
          }}
        >
          Update detail/s
        </button>
        <br />
        <br />
        <div className="mb-3">
          <div className="row">
            <div className="col-md-9">
              <label for="introduction" className="form-label">
                Upload Image
              </label>
              <input
                className="form-control"
                type="file"
                id="introduction"
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
                Upload Picture
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminIntroduction;
