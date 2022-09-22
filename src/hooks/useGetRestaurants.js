import { collection, onSnapshot, query, where } from "firebase/firestore"
import useStreamCollection from "./useStreamCollection"
import { db } from "../firebase"

const useStreamRestaurants = (filterOptions) => {
  if (filterOptions) {
    const restaurantsRef = collection(db, 'restaurants')
    const q = query(restaurantsRef, where("offers", "==", filterOptions.option2))
    console.log("Filter options in hook!", filterOptions.option2)
    return useStreamCollection(q, filterOptions)
  }
  
  const q = query((collection(db, 'restaurants')))
  return useStreamCollection(q, filterOptions)
}

export default useStreamRestaurants