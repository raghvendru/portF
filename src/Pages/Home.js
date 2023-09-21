import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

//Components
import HeroSection from "../Components/HeroSection.js";
import Skills from "../Components/Skills.js";
import RecentProjects from "../Components/RecentProjects.js";
import Introduction from "../Components/Introduction.js";
import Testimonials from "../Components/Testimonials.js";
import Footer from "../Components/Footer.js";
import Expericence from "../Components/Expericence.js";
import ContactUs from "./ContactUs.js";

const Home = () => {
  const context = useContext(UserContext);
  if (context.isAdmin) {
    return <Redirect to="/admin/adminPanel" />;
  }
  return (
    <>
      <HeroSection />
      <Skills />
      <RecentProjects />
      <Introduction />
      <Testimonials />
      <Expericence />
      <ContactUs />
      <Footer />
    </>
  );
};

export default Home;
