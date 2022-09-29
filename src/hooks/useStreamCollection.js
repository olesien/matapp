import { collection, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useStreamCollection = (col) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, col));
        const unsub = onSnapshot(q, async (querySnapshot) => {
            setLoading(true);

            const fetchedData = [];
            querySnapshot.forEach((doc) => {
                fetchedData.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            setData(fetchedData);
            setLoading(false);
        });

        return unsub;
    }, []);
    return {
        data,
        loading,
    };
};

export default useStreamCollection;
