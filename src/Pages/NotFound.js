import notfoundimage from "../Images/404.png";
const NotFound = () => {
  return (
    <>
      <img
        src={notfoundimage}
        style={{ height: "75vh", width: "100vw" }}
        className="img-fluid"
        alt="..."
      ></img>
    </>
  );
};

export default NotFound;
