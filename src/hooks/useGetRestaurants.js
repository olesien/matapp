import { collection, query, where } from "firebase/firestore"
import useGetCollection from "./useGetCollection"
import { db } from "../firebase"

const useGetRestaurants = (filterOptions) => {
  if (filterOptions) {
    const restaurantsRef = collection(db, 'restaurants')
    const q = query(restaurantsRef, where("offers", "==", filterOptions.option2))
    console.log("Filter options in hook!", filterOptions.option2)
    return useGetCollection(q, filterOptions)
  }
  
  const q = query((collection(db, 'restaurants')))
  return useGetCollection(q, filterOptions)
}

export default useGetRestaurants