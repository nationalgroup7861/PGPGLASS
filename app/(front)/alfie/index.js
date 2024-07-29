"use client";

import { AlfieGptContext } from "@/app/context/AlfieGptContext";
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
      <div className="spinner-border spinner-large color-primary display-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
);


const Alfie = () => {
  const { chatgptKey, permissions,isLoading } = useContext(AlfieGptContext);

  if (isLoading) {
    return <Loading />;
  }

  if (permissions?.alfie) {
    return <CenteredMessage icon="fa-shield-keyhole" message="Alfie Is Not Activated for You" />;
  }


  return (
    <>

      <div className="rbt-main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
        <iframe
          src="https://pgpfirst.lightinfosys.com/assist/28?bot_id=28&test=true&train_or_publish=publish"
          title="Alfie Uat"
          style={{ width: '100%', height: '80%', border: 'none' }}
        />
      </div>
    </>
  );
};

export default Alfie;
