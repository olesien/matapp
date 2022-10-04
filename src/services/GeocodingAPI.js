import axios from "axios";

const mapsKey = import.meta.env.VITE_MAPS_KEY;

axios.defaults.baseURL = "https://maps.googleapis.com/maps/api/geocode";

const get = async (params) => {
    const res = await axios.get(`json?${params}&key=${mapsKey}`);
    return res.data;
};

const getGeocode = (data) => {
    const address = data.queryKey[1];
    return get(`address=${address}`);
};

const getReverseGeocode = (lat, lng) => {
    return get(`latlng=${lat},${lng}`);
};

const getReverseGeocodeAsync = async (lat, lng) => {
    return await get(`latlng=${lat},${lng}`);
};

// get the city/town (or similar) based on the user's current position
const getCityName = (location) => {
    return get(`latlng=${location.lat},${location.lng}&result_type=locality`);
};

const exports = {
    getGeocode,
    getReverseGeocode,
    getCityName,
    getReverseGeocodeAsync,
};

export default exports;
