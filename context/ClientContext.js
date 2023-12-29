"use client";

import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from "react";
import { ApiContext } from "./ApiContext";
import { CLIENT_API } from '@/util/constant';

const ClientContext = createContext();
ClientProvider.propTypes = {
  children: PropTypes.node,
};
function ClientProvider({children}) {
  const [clientList, setClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getApiData, postApiData } = useContext(ApiContext);

  async function GetClientList() {
    try {
      const response = await getApiData(CLIENT_API.list);
      if (response) {
        setClientList(response.data.result.clients)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    GetClientList();
  }, []);

  return (
    <ClientContext.Provider
      value={{
        clientList,
        setClientList,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
export { ClientContext, ClientProvider };

