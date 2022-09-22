import { collection, query, where } from "firebase/firestore"
import useGetCollection from "./useGetCollection"
import { db } from "../firebase"

const useGetRestaurants = (filterOptions) => {
  // filterOptions is passed along to useGetCollection so that the restaurants are refetched when the filter options change.
  const queryConstraints = []
  if (filterOptions) {
    // If the first filter option is truthy, add the query constraint
    if (filterOptions.option1) {
      queryConstraints.push(where("type_of_establishment", "==", filterOptions.option1))
    }
    if (filterOptions.option2) {
    // If the second filter option is truthy, add the query constraint
      queryConstraints.push(where("offers", "==", filterOptions.option2))
    }
  }

  const q = query(collection(db, 'restaurants'), ...queryConstraints)
  return useGetCollection(q, filterOptions)
}

export default useGetRestaurants