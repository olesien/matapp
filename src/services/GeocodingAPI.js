import axios from "axios";

const mapsKey = import.meta.env.VITE_MAPS_KEY;

axios.defaults.baseURL = "https://maps.googleapis.com/maps/api/geocode";

const get = async (params) => {
    const res = await axios.get(`json?${params}&key=${mapsKey}`);
    return res.data;
};

const getReverseGeocode = (data) => {
    const lat = data.queryKey[1];
    const lng = data.queryKey[2];
    return get(`latlng=${lat},${lng}`);
};

const exports = { getReverseGeocode };

export default exports;
