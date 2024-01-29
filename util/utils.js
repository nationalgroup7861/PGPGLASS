// eslint-disable-next-line import/no-unresolved
import axios from './axios';

const setSession = (client) => {
    if (client) {
        axios.defaults.headers.Clientid = client.id;
    } 
    else {
        delete axios.defaults.headers.Clientid;
    }
};


// const setCountryTypeHeader = (currentCountry) => {
//     if (currentCountry) {
//         axios.defaults.headers.countryMasterId = currentCountry.country_master_id;
//         axios.defaults.headers.regionMasterId = currentCountry.region_master_id;
//         axios.defaults.headers.cityMasterId = currentCountry.city_master_id;
//         axios.defaults.headers.workshopTypeId = WORKSHOP_TYPE_ID;
//     } else {
//         delete axios.defaults.headers.countryMasterId;
//         delete axios.defaults.headers.regionMasterId;
//         delete axios.defaults.headers.cityMasterId;
//         delete axios.defaults.headers.workshopTypeId;
//     }
// };

export { setSession };
