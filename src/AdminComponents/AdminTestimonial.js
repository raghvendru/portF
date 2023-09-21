import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";
import firebase from "../Config/firebaseConfig";

const AdminTestimonial = () => {
  const context = useContext(UserContext);

  const [file, setFile] = useState(null);
  const [URL, setURL] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [clientRating, setClientRating] = useState(0);
  const [clientRatingStars, setClientRatingStars] = useState([0, 0, 0, 0, 0]);
  const [defaultPictureURL, setDefaultPictureURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/portfolio-aa285.appspot.com/o/testimonialsPictures%2Fdownload.jfif?alt=media&token=da30cc75-f587-4038-995a-11d650f20e87"
  );
  const [isSave, setIsSave] = useState(false);

  const handleAddTestimonial = async () => {
    if (clientName && setClientMessage && clientRatingStars) {
      if (isSave) {
        if (URL) {
          await firebase
            .database()
            .ref(`TestimonialSection/Testimonials/${Date.now()}`)
            .set({
              Name: clientName,
              Message: clientMessage,
              ClientPictureURL: URL ? URL : defaultPictureURL,
              Rating: clientRatingStars,
            })
            .then(() => {
              setFile(null);
              setURL(null);
              setClientName("");
              setClientMessage("");
              setIsSave(false);
              setClientRating(0);
              setClientRatingStars([0, 0, 0, 0, 0]);
              toast("Testimonial added successfully", { type: "success" });
            })
            .catch((err) => {
              toast(err.message, { type: "error" });
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

  const handleRatingChange = (rating) => {
    setClientRating(rating);
    let ratingStars = [];
    for (let i = 0; i < rating; i++) {
      ratingStars.push(1);
    }
    for (let j = 0; j < 5 - rating; j++) {
      ratingStars.push(0);
    }
    setClientRatingStars(ratingStars);
  };

  const handleFileChange = (files) => {
    if (files) {
      setFile(files[0]);
      setIsSave(false);
    }
  };

  const handleFileUpload = async () => {
    const bucketName = "testimonialsPictures";
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
      <div className="AddNewTestimonial mt-4 p-5">
        <h1 className="text-center">Add new testimonial</h1>
        <label for="clientName">Client Name *</label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter client name here..."
          aria-label="default input example"
          id="clientName"
          value={clientName}
          onChange={(e) => {
            setClientName(e.target.value);
          }}
        />
        <br />

        <div className="row">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text">Client Message *</span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={clientMessage}
                onChange={(e) => {
                  setClientMessage(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="col-md-4">
            <label for="clientRating">Rating | </label> {clientRating}
            <br />
            <input
              type="range"
              min={0}
              max={5}
              id="clientRating"
              value={clientRating}
              onChange={(e) => {
                handleRatingChange(e.target.value);
              }}
            />
          </div>
        </div>
        <br />

        <div className="mb-3">
          <div className="row">
            <div className="col-md-9">
              <label for="testimonial" className="form-label">
                Upload Image
              </label>
              <input
                disabled={clientName && clientMessage ? false : true}
                className="form-control"
                type="file"
                id="testimonial"
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
          disabled={clientName && clientMessage ? false : true}
          type="button"
          className="btn btn-success"
          onClick={() => {
            handleAddTestimonial();
          }}
        >
          Add Testimonial
        </button>
      </div>
    </>
  );
};

export default AdminTestimonial;
