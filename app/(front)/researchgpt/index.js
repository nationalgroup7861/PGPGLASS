"use client";

import { ResearchGptContext } from "@/app/context/ResearchGptContext";
import ResearchGptStaticBarDashboard from "@/components/Common/ResearchGptStaticBarDashboard";
import ResearchGptGenerator from "@/section/researchgpt/ResearchGptGenerator";
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



const Research = () => {
  const { chatgptKey, permissions,isLoading } = useContext(ResearchGptContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!permissions?.research_gpt) {
    return <CenteredMessage icon="fa-shield-keyhole" message="Gpt 3.5 Is Not Activated for You" />;
  }

  if (!chatgptKey) {
    return <CenteredMessage icon="fa-key" message="Research Gpt  Key is Not Activated for You" />;
  }

  return (
    <>
    <div className="rbt-main-content">
      <div className="rbt-daynamic-page-content">
        <div className="rbt-dashboard-content">
          <div className="content-page">
            <div className="chat-box-section">
              <ResearchGptGenerator />
              <ResearchGptStaticBarDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <CenteredMessage icon="fa-shield-keyhole" message="To be Integrated" /> */}
    </>
  );
};

export default Research;
