import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useGetDocument = (collection, id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const getDocSnapshot = async () => {
            setLoading(true);
            // get reference to document in collection
            const ref = doc(db, collection, id);
            const snapshot = await getDoc(ref);

            if (!snapshot.exists()) {
                setData(false);
                setLoading(false);
                return;
            }

            setData(snapshot.data());
            setLoading(false);
        };
        getDocSnapshot();
    }, [id]);

    return {
        data,
        loading,
    };
};

export default useGetDocument;
