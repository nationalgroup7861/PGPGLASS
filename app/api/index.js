import axiosInstance from "../util/axios";

async function apiGetData(url, params, signal) {
    return axiosInstance.get(url, { params, signal });
}
async function apiPostData(url, data = {}) {
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    return axiosInstance.post(url, data);
}

async function apiPdfGetData(url, params, signal) {
    return axiosInstance.get(url, { params, signal,responseType:'blob'});
}

async function apiPdfPostData(url, data={}) {
    return axiosInstance.post(url, data,{responseType:'blob'});
}

async function apiHeadData(url, data = {}) {
    return axiosInstance.head(url, formData);
}
async function apiDeletData(url, data = {}) {
    return axiosInstance.delete(url, data);
}
async function apiPutData(url, data = {}) {
    return axiosInstance.put(url, data);
}
async function apiPatchData(url, data = {}) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    return axiosInstance.patch(url, formData);
}
export { apiDeletData, apiGetData, apiHeadData, apiPatchData, apiPostData, apiPutData,apiPdfGetData,apiPdfPostData };