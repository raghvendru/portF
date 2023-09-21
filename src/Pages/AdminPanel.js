import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { Redirect } from "react-router-dom";
import AdminRecentProjects from "../AdminComponents/AdminRecentProjects";
import Resume from "../AdminComponents/Resume";
import AdminIntroduction from "../AdminComponents/AdminIntroduction";
import AdminSkills from "../AdminComponents/AdminSkills";
import AdminTestimonial from "../AdminComponents/AdminTestimonial";
import AdminHeroSection from "../AdminComponents/AdminHeroSection";
import AdminFooter from "../AdminComponents/AdminFooter";
import AdminExperience from "../AdminComponents/AdminExperience";

const AdminPanel = () => {
  const context = useContext(UserContext);

  if (!context.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <AdminHeroSection />
        </div>
        <div className="col-md-6">
          <AdminSkills />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <AdminRecentProjects />
        </div>
        <div className="col-md-6">
          <AdminIntroduction />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <AdminTestimonial />
        </div>
        <div className="col-md-6">
          <Resume />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <AdminFooter />
        </div>
        <div className="col-md-6">
          <AdminExperience />
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
