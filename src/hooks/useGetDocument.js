import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"

const useGetDocument = (collection, id) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getDocSnapshot = async () => {
            setLoading(true)
            // get reference to document in collection 'restaurants'
            const ref = doc(db, collection, id)
            const snapshot = await getDoc(ref)

            if (!snapshot.exists()) {
                setData(false)
                setLoading(false)
                return
            }

            setData(snapshot.data())
            setLoading(false)
        }
        getDocSnapshot()
    }, [])

    return {
        data,
        loading,
    }
}

export default useGetDocument