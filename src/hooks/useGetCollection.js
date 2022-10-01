import { getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

const useGetCollection = (query, filterOptions, cityName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // refetches when filterOptions or cityName changes.
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedData = [];
            const querySnapshot = await getDocs(query);
            querySnapshot.forEach((doc) => {
                fetchedData.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            // console.log(fetchedData)
            setData(fetchedData);
            setLoading(false);
        };
        fetchData();
    }, [filterOptions, cityName]);

    return {
        data,
        loading,
    };
};

export default useGetCollection;
