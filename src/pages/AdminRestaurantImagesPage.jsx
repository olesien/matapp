import React from "react";
import Container from "react-bootstrap/Container";
import { useTable } from "react-table";
import RenderSortedTable from "../components/RenderSortedTable";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import useStreamRestaurantImages from "../hooks/useStreamRestaurantImages";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useState } from "react";
import ImageOverlayAdmin from "../components/ImageOverlayAdmin";
import { useSortBy } from "react-table";
import { ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";

export default function AdminRestaurantImagesPage() {
    const { data: images, loading } = useStreamRestaurantImages();
    const [image, setImage] = useState(null);
    const toggleRestaurant = (id) => {
        const image = images.find((image) => image.id == id);
        setImage(image);
    };

    const toggleApproved = async (id, approved) => {

        const imageRef = doc(db, "user-pictures", id);

        try {
            await updateDoc(imageRef, {
                approved: !approved,
            });
            toast.success("Image approved");
        } catch (err) {
            toast.error(err.message)
        }
    };

    const deleteRestaurant = async (id, source) => {
        try {
            await deleteDoc(doc(db, "user-pictures", id));
            const imgRef = ref(storage, source);
            deleteObject(imgRef);
            toast.success("Image deleted");
        } catch (err) {
            toast.error(err.message)
        }
    };

    const data = React.useMemo(
        () =>
            loading
                ? []
                : images.map((image) => ({
                    id: image.id,
                    imageurl: image.imageurl,
                    source: image.source,
                    title: image.title,
                    approved: image?.approved,
                })),
        [images]
    );

    const actionSortByFunction = React.useMemo(() => {
        return (rowA, rowB, columnId, desc) => {
            //Sort by approve / disapprove
            if (rowA.original.approved && !rowB.original.approved) return 1;
            if (!rowA.original.approved && rowB.original.approved) return -1;
            return 0;
        };
    }, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "Image",
                accessor: "imageurl",
                Cell: (tableProps) => (
                    <div>
                        <Image
                            fluid
                            style={{ width: 100, height: 80 }}
                            src={tableProps.row.original.imageurl}
                            alt="Avatar"
                        />
                    </div>
                ),
                disableSortBy: true,
            },
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (tableProps) => (
                    <div>
                        <Button
                            className="mt-2"
                            style={{ marginRight: 10 }}
                            variant="primary"
                            onClick={() => {
                                toggleRestaurant(tableProps.row.original.id);
                            }}
                        >
                            {"View"}
                        </Button>
                        <Button
                            className="mt-2"
                            variant={
                                tableProps.row.original.approved
                                    ? "danger"
                                    : "success"
                            }
                            style={{ marginRight: 10 }}
                            onClick={() => {
                                toggleApproved(
                                    tableProps.row.original.id,
                                    tableProps.row.original.approved
                                );
                            }}
                        >
                            {tableProps.row.original.approved
                                ? "Disapprove"
                                : "Approve"}
                        </Button>
                        <Button
                            className="mt-2"
                            style={{ marginRight: 10 }}
                            variant="danger"
                            onClick={() => {
                                deleteRestaurant(
                                    tableProps.row.original.id,
                                    tableProps.row.original.source
                                );
                            }}
                        >
                            {"Delete"}
                        </Button>
                    </div>
                ),
                sortType: actionSortByFunction,
            },
        ],
        [images, actionSortByFunction]
    );

    const tableInstance = useTable({ columns, data }, useSortBy);
    return (
        <Container>
            <h2>Images</h2>
            <RenderSortedTable tableInstance={tableInstance} />
            <ImageOverlayAdmin
                image={image}
                handleClose={() => setImage(null)}
            />
        </Container>
    );
}
