export const INTERNET_NETWORK_ERROR = "Internet Connection Error";
export const TIMEOUT = "Time Out of Connection";

export const CLIENT_API = {
  login: "/client/login",
  create: "/client/create",
  list: "/client",
  delete:"/client/delete/",
  update:"/client/update",
  updateprofile:"/client/updateprofile",
  updatepassword:"client/updatepassword",
  clientpermissions:"/client/clientpermissions/",

};

export const USER_API = {
  login: "/user/login",
  create: "/user/create",
  list: "/user",
  delete:"/user/delete/",
  update:"/user/update",


};


export const CHATSESSION_API = {
  create: "/chat-session/create",
  list: "/chat-session/getByClientId/",
  delete:"/chat-session/delete/",
  updateTitle:"/chat-session/updateTitle",

};


export const MESSAGE_API = {
  create: "/message/create",
  list: "/message/getByClientId",
  delete:"/message/delete/",
};


export const INFO_API = {
info:'common/info',
userdetail:'common/userdetail'

};






