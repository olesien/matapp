import { getDocs } from "firebase/firestore"
import { useState } from "react"
import { useEffect } from "react"

const useGetCollection = (query, filterOptions) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
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
            setLoading(false)
        }
        fetchData()
    }, [filterOptions])


    return (
        /**
         * @todo fråga Eric hur man gör för att returnera loading state utan att ta sönder renderingen av restauranger i HomePage
         */
        data
    )
}

export default useGetCollection