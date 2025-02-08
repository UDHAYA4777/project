import React, { useEffect } from "react";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LatestJob from "./LatestJob";
import Navbar from "./shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <LatestJob />
      <Footer />
    </div>
  );
};

export default Home;
