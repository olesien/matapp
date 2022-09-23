import { getDocs } from "firebase/firestore"
import { useState } from "react"
import { useEffect } from "react"

const useGetCollection = (query, filterOptions) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = []
            const querySnapshot = await getDocs(query)
            querySnapshot.forEach(doc => {
                fetchedData.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            // console.log(fetchedData)
            setData(fetchedData)
        }
        fetchData()
    }, [filterOptions])


    return (
        data
    )
}

export default useGetCollection