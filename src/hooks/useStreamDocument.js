import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useStreamDocument = (collection, id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ref = doc(db, collection, id);
        const unsub = onSnapshot(ref, async (doc) => {
            setLoading(true);

            if (!doc.exists()) {
                setData(false);
                setLoading(false);
                return;
            }

            setData(doc.data());
            setLoading(false);
        });
        return unsub;
    }, []);
    return {
        data,
        loading,
    };
};

export default useStreamDocument;
