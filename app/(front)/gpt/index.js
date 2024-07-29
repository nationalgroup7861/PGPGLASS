"use client";


import { PgpGptContext } from "@/app/context/PgpGptContext";
import GptStaticBarDashboard from "@/components/Common/GptStaticBarDashboard";
import GptGenerator from "@/section/gpt/GptGenerator";
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



const Gpt = () => {
  const { chatgptKey, permissions,isLoading } = useContext(PgpGptContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!permissions?.gpt_35) {
    return <CenteredMessage icon="fa-shield-keyhole" message="Gpt 3.5 Is Not Activated for You" />;
  }

  if (!chatgptKey) {
    return <CenteredMessage icon="fa-key" message="Gpt 3.5 Key is Not Activated for You" />;
  }

  return (
    <>
    <div className="rbt-main-content">
      <div className="rbt-daynamic-page-content">
        <div className="rbt-dashboard-content">
          <div className="content-page">
            <div className="chat-box-section">
              <GptGenerator />
              <GptStaticBarDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Gpt;
