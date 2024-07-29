import axios from 'axios';
import { HOST_API } from './config-global';


// ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: HOST_API });
const axiosInstance = axios.create({
  baseURL: HOST_API,
  timeout: 240000,
  timeoutErrorMessage: "Demo",
  headers: {
    token: "b2905pgp-0df5-44ee-f760-5a78be12gpt3",
    key: "pgpb973a-7b1e-4f52-e3b7-4e9e59dfac67",
    applicationId: "1",
    deviceType: "Web",
  }
});


axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;





