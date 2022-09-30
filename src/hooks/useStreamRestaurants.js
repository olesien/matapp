import { collection, orderBy, query, where } from "firebase/firestore";
import useStreamCollection from "./useStreamCollection";
import { db } from "../firebase";

const useStreamRestaurants = () => {
    return useStreamCollection("restaurants");
};

export default useStreamRestaurants;
