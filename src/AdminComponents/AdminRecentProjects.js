import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";
import firebase from "../Config/firebaseConfig";

const AdminRecentProjects = () => {
  const context = useContext(UserContext);

  const [file, setFile] = useState(null);
  const [URL, setURL] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isSave, setIsSave] = useState(false);
  const [projectLink, setProjectLink] = useState("");

  const handleAddProject = async () => {
    if (projectName && projectDescription) {
      if (isSave) {
        if (URL) {
          await firebase
            .database()
            .ref(`RecentProjectsSection/Projects/${Date.now()}`)
            .set({
              Name: projectName,
              Description: projectDescription,
              Link: projectLink ? projectLink : "#",
              ThumbnailURL: URL,
            })
            .then(() => {
              toast("Project added successfully", { type: "success" });
              setFile(null);
              setURL(null);
              setProjectName("");
              setProjectDescription("");
              setIsSave(false);
              setProjectLink("");
            });
        } else {
          toast("Please wait, image is saving to the server.", {
            type: "info",
          });
        }
      } else {
        toast("Please save image to server", { type: "error" });
      }
    }
  };

  const handleFileChange = (files) => {
    if (files) {
      setFile(files[0]);
      setIsSave(false);
    }
  };

  const handleFileUpload = async () => {
    const bucketName = "recentProjectImages";
    const storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    const uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      firebase
        .storage()
        .ref(`${bucketName}`)
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          if (url) {
            toast(
              "Image is saved to the server successfully. Now you can add project to the website.",
              { type: "info" }
            );
            setURL(url);
          }
        });
    });
    setIsSave(true);
  };

  if (!context.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <hr />
      <div className="AddNewProject mt-4 p-5">
        <h1 className="text-center">Add new project</h1>
        <label for="projectName">Project Name *</label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter project name here..."
          aria-label="default input example"
          id="projectName"
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
        />
        <br />

        <div className="input-group">
          <span className="input-group-text">Description *</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={projectDescription}
            onChange={(e) => {
              setProjectDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <br />

        <label for="projectlink">Project Link</label>
        <input
          className="form-control"
          type="text"
          placeholder="Please provide project link here..."
          aria-label="default input example"
          id="projectlink"
          value={projectLink}
          onChange={(e) => {
            setProjectLink(e.target.value);
          }}
        />
        <br />

        <div className="mb-3">
          <div className="row">
            <div className="col-md-9">
              <label for="addNewProject" className="form-label">
                Upload Image *
              </label>
              <input
                disabled={projectName && projectDescription ? false : true}
                className="form-control"
                type="file"
                id="addNewProject"
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
                Save
              </button>
            </div>
          </div>
        </div>
        <button
          disabled={projectName && projectDescription && file ? false : true}
          type="button"
          className="btn btn-success"
          onClick={() => {
            handleAddProject();
          }}
        >
          Add Project
        </button>
      </div>
    </>
  );
};

export default AdminRecentProjects;
