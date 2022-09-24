import { doc, getDoc } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../firebase"

const useGetRestaurant = (id) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getDocSnapshot = async () => {
            // get reference to document in collection 'restaurants'
            const ref = doc(db, 'restaurants', id)
            const snapshot = await getDoc(ref)

            if(snapshot.exists()) {
                setData(snapshot.data())
            } else {
                setData(false)
            }
        }
        getDocSnapshot()
    }, [])

    return {
        data,
    }
}

export default useGetRestaurant