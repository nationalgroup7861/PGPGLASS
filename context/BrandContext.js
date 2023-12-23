"use client";

import { BARND_API } from "@/utils/constant";
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from "react";
import { ApiContext } from "./ApiContext";

const BrandContext = createContext();
BrandProvider.propTypes = {
  children: PropTypes.node,
};
function BrandProvider({children}) {
  const [brandList, setBrandList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getApiData, postApiData } = useContext(ApiContext);

  async function GetBrandList() {
    try {
      const response = await getApiData(BARND_API.list);
      if (response) {
        setBrandList(response.data.result.brands)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    GetBrandList();
  }, []);

  return (
    <BrandContext.Provider
      value={{
        brandList,
        setBrandList,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}
export { BrandContext, BrandProvider };

