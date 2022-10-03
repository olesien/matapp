import useStreamCollection from "./useStreamCollection";

const useStreamRestaurants = () => {
    return useStreamCollection("restaurants");
};

export default useStreamRestaurants;
