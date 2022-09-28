import { collection, orderBy, query, where } from "firebase/firestore";
import useStreamCollection from "./useStreamCollection";
import { db } from "../firebase";

const useGetUsers = () => {
    // filterOptions is passed along to useGetCollection so that the restaurants are refetched when the filter options change.

    return useStreamCollection("users");
};

export default useGetUsers;
