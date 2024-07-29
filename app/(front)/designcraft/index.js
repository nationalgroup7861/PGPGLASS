"use client";


import { DesignGptContext } from "@/app/context/DesignGptContext";
import DesignCraftStaticBarDashboard from "@/components/Common/DesignCraftStaticBarDashboard";
import DesignCraftGenerator from "@/section/designcraft/DesignCraftGenerator";
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


const DesignCraftPage = () => {

  const { chatgptKey, permissions,isLoading } = useContext(DesignGptContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!permissions?.design_craft) {
    return <CenteredMessage icon="fa-shield-keyhole" message="Design Craft Is Not Activated for You" />;
  }

  if (!chatgptKey) {
    return <CenteredMessage icon="fa-key" message="Design Craft Key is Not Activated for You" />;
  }


  return (
    <>

      <div className="rbt-main-content">
        <div className="rbt-daynamic-page-content">
          <div className="rbt-dashboard-content">
            <div className="content-page">
              <div className="chat-box-section">
                {/* <ImageEditor /> */}
                <DesignCraftGenerator/>
                <DesignCraftStaticBarDashboard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignCraftPage;
