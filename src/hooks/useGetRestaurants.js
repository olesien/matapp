import { collection, orderBy, query, where } from "firebase/firestore";
import useGetCollection from "./useGetCollection";
import { db } from "../firebase";

const useGetRestaurants = (filterOptions, cityName) => {
    // filterOptions is passed along to useGetCollection so that the restaurants are refetched when the filter options change.

    const queryConstraints = [];
    if (filterOptions) {
        // If the respective options are truthy, add them to the array of query constraints.
        if (filterOptions.type) {
            queryConstraints.push(
                where("type_of_establishment", "==", filterOptions.type)
            );
        }
        if (filterOptions.offering) {
            queryConstraints.push(where("offers", "==", filterOptions.offering));
        }
        if (!filterOptions.listAll) {
            console.log(cityName)
            queryConstraints.push(where("place", "==", cityName));
        }
    }

    // fetch the collection based on the constraints that passed (ordering by name is always included)
    const q = query(
        collection(db, "restaurants"),
        ...queryConstraints,
        orderBy("name", "asc"),
    );
    return useGetCollection(q, filterOptions, cityName);
};

export default useGetRestaurants;
