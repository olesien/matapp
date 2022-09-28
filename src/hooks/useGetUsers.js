import { collection, orderBy, query, where } from "firebase/firestore";
import useGetCollection from "./useGetCollection";
import { db } from "../firebase";

const useGetUsers = () => {
    // filterOptions is passed along to useGetCollection so that the restaurants are refetched when the filter options change.
    const q = query(collection(db, "users"), orderBy("email", "asc"));
    return useGetCollection(q);
};

export default useGetUsers;
