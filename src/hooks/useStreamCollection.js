import { collection, onSnapshot, query } from "firebase/firestore"
import { useState } from "react"
import { useEffect } from "react"
import { db } from "../firebase"

const useStreamCollection = (col) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const q = query(collection(db, col))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedData = []
            querySnapshot.forEach(doc => {
                fetchedData.push({
                    id: doc.id,
                    ...doc.data()
                }
                )
            })
            console.log(fetchedData)
            setData(fetchedData)
        })

        return unsubscribe
    }, [])


    return (
        data
    )
}

export default useStreamCollection