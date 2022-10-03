import { collection, orderBy, query, where } from "firebase/firestore";
import useGetCollection from "./useGetCollection";
import { db } from "../firebase";

const useGetRestaurantImages = (restaurantId) => {
    // filterOptions is passed along to useGetCollection so that the restaurants are refetched when the filter options change.
    console.log(restaurantId);
    const queryConstraints = [];
    queryConstraints.push(where("restaurantid", "==", restaurantId));
    queryConstraints.push(where("approved", "==", true));

    // fetch the collection based on the constraints that passed (ordering by name is always included)
    const q = query(collection(db, "user-pictures"), ...queryConstraints);
    return useGetCollection(q);
};

export default useGetRestaurantImages;
