"use client";

import { selectToCountry, selectToSAS } from "@/constant/data";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({selectedCountryValue,selectedSasValue,handleCountryValue,handleSasValue})
{

  return (
   
    <div className="border-b border-[#ff6600] px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
    <div className="min-w-0 flex-1">
      <h1 className="text-lg font-semibold leading-6 text-[#ff6600] sm:truncate">
        PGPGPT
      </h1>
    </div>
    <div className="mt-4 flex sm:ml-4 sm:mt-0">
      <select
        value={selectedSasValue}
        onChange={handleSasValue}
        className="select rounded-lg select-bordered  bg-white ring-0 ring-gray-200 w-full max-w-xs"
      >
        {selectToSAS.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>

      <select
        value={selectedCountryValue}
        onChange={handleCountryValue}
        className="ml-2 select rounded-lg select-bordered  bg-white ring-0 ring-gray-400 w-full max-w-xs"
      >
        {selectToCountry.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  </div>

  );
}
