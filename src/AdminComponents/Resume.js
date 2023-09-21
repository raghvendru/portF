import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";
import firebase from "../Config/firebaseConfig";

const Resume = () => {
  const context = useContext(UserContext);

  const [file, setFile] = useState(null);

  const handleFileChange = (files) => {
    if (files) {
      setFile(files[0]);
    }
  };

  const handleFileUpload = async () => {
    const bucketName = "resume";
    const storageRef = firebase.storage().ref(`${bucketName}/resume.pdf`);
    const uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      firebase
        .storage()
        .ref(`${bucketName}`)
        .child("resume.pdf")
        .getDownloadURL()
        .then((url) => {
          if (url) {
            const resumeRef = firebase.database().ref("Resume/");
            resumeRef
              .update({
                ResumeURL: url,
              })
              .then(() => {
                toast("Resume has been uploaded successfully", {
                  type: "success",
                });
              });
          }
        })
        .catch((err) => {
          toast(err.message, { type: "error" });
        });
    });
  };

  if (!context.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <hr />
      <div className="AddNewResume mt-4 p-5">
        <h1 className="text-center">Add new resume</h1>

        <div className="mb-3">
          <div className="row">
            <div className="col-md-9">
              <label for="resume" className="form-label">
                Upload Resume
              </label>
              <input
                className="form-control"
                type="file"
                id="resume"
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
                Upload Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
