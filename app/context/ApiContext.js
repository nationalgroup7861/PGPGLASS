"use client";
import { apiDeletData, apiGetData, apiPdfGetData, apiPdfPostData, apiPostData, apiPutData } from "@/app/api";
import PropTypes from "prop-types";
import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { INTERNET_NETWORK_ERROR ,TIMEOUT} from "../util/constant";
const error_400 = "error_400";
const error_internet = "error_internet";
const error_timeout = "error_timeout";
const error_401 = "error_401";
const error_404 = "error_404";
const error_440 = "error_440";
const error_503 = "error_503";
const ApiContext = createContext();
ApiProvider.propTypes = {
  children: PropTypes.node,
};
function ApiProvider({ children }) {
  async function postApiData(url, data = {}, showToast = true) {
    try {
      const response = await apiPostData(url, data);


     showToast && toast.success("success", {
        toastId: error_timeout,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "w-96",
      });

      return response;
    } catch (error) {
        checkError(error);
      throw error;
    }
  }
  async function getApiData(url, params = {}, signal,showToast = false) {
    try {
      const response = await apiGetData(url, params, signal);
    showToast &&  toast.success("success", {
        toastId: error_timeout,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "w-96",
      });
      return response;
    } catch (error) {
      checkError(error);
      throw error;
    }
  }


  async function postApiPdfData(url, data = {}, showToast = true) {
    try {
      const response = await apiPdfPostData(url, data);
      toast.success("success", {
        toastId: error_timeout,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "w-96",
      });
      return response;
    } catch (error) {
        checkError(error);
      throw error;
    }
  }


  async function getApiPdfData(url, params = {}, signal) {
    try {
        const response = await apiPdfGetData(url, params, signal);
        return response;
    } catch (error) {
      checkError(error);
        throw error;
    }
}







  async function putApiData(url, data = {}) {
    try {
      const response = await apiPutData(url, data);
      toast.success("success", {
        toastId: error_timeout,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "w-96",
      });
      
      return response;
    } catch (error) {
      checkError(error);
      throw error;
    }
  }
  async function deleteApiData(url, data = {}) {
    try {
      const response = await apiDeletData(url, data);
      toast.success("success", {
        toastId: error_timeout,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "w-96",
      });
      return response;
    } catch (error) {
      checkError(error);
      throw error;
    }
  }
  function checkError(error) {
    if (error.message == TIMEOUT) {
      toast.error("error_slow_internet_connection", {
        toastId: error_timeout,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "w-96",
      });
    } else if (error.message == INTERNET_NETWORK_ERROR) {
      toast.error("error_internet_connection", {
        toastId: error_internet,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (error.status == 401) {
      toast.error(error.messages, {
        toastId: error_401,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (error.status == 404) {
      toast.error(error.messages, {
        toastId: error_404,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (error.status == 440) {
      toast.error(error.messages, {
        toastId: error_440,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });


    } else if (error.status == 503) {
      toast.error(error.messages, {
        toastId: error_503,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
} else {
  toast.error(error.messages, {
    toastId: error_400,
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    className: "w-96",
  })
    }
  }
  return (
    <ApiContext.Provider
      value={{
        postApiData,
        getApiData,
        putApiData,
        deleteApiData,
        getApiPdfData,
        postApiPdfData,
      }}
    >
      {children}
      <ToastContainer />
    </ApiContext.Provider>
  );
}
export { ApiContext, ApiProvider };

