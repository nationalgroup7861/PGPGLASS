"use client";


import { GlassGptContext } from "@/app/context/GlassGptContext";
import { PgpGptContext } from "@/app/context/PgpGptContext";
import ServiceStaticBarDashboard from "@/components/Common/ServiceStaticBarDashboard";
import GlassGptGenerator from "@/section/glassgpt/GlassGptGenerator";
import { useContext } from "react";

const CenteredMessage = ({ icon, message }) => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-center">
      <i className={`fa-sharp fa-regular ${icon} display-1 mb-3 text-danger`}></i>
      <h6 className="title">{message}</h6>
    </div>
  </div>
);

const Loading = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-center">
      <div className="spinner-border spinner-large color-primary display-1"   role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
);



const GlassGpt = () => {
  const { chatgptKey, permissions,isLoading } = useContext(GlassGptContext);

  if (isLoading) {
    return <Loading />;
  }


  if (!permissions?.glass_gpt) {
    return <CenteredMessage icon="fa-shield-keyhole" message="Glass Gpt Is Not Activated for You" />;
  }

  if (!chatgptKey) {
    return <CenteredMessage icon="fa-key" message="Glass Gpt Key is Not Activated for You" />;
  }

  return (
    <>
    <div className="rbt-main-content">
      <div className="rbt-daynamic-page-content">
        <div className="rbt-dashboard-content">
          <div className="content-page">
            <div className="chat-box-section">
              <GlassGptGenerator />
              <ServiceStaticBarDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default GlassGpt;
