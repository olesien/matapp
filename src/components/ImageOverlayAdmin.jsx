import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import useGetRestaurant from "../hooks/useGetRestaurant";

export default function ImageOverlayAdmin({ image, handleClose }) {
    const [title, setTitle] = useState(image?.title);
    const [url, setUrl] = useState(image?.imageurl);
    const [imageSrc, setImageSrc] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(null);
    const { data: restaurant, loading: restaurantLoading } = useGetRestaurant(
        image?.restaurantid
    );

    useEffect(() => {
        setTitle(image?.title);
        setUrl(image?.imageurl);
    }, [image]);

    const submit = async () => {
        const imageRef = doc(db, "user-pictures", image.id);

        try {
            setLoading(true);
            let imageurl = image.imageurl;
            let source = image.source;
            if (imageSrc) {
                source = `photos/${image.userid}/${Date.now() + "-" + title}`;
                const fileRef = ref(storage, source);

                // upload photo to fileRef
                const uploadResult = await uploadBytes(fileRef, imageSrc);

                // get download url to uploaded file
                imageurl = await getDownloadURL(uploadResult.ref);
            }
            await updateDoc(imageRef, {
                title,
                imageurl,
                source,
            });

            toast.success("Image Edited!");
            setLoading(false);
            handleClose();
        } catch (err) {
            setLoading(false);
            setErr(err.message);
        }
    };
    return (
        <Modal show={image} onHide={handleClose} dialogClassName="modal-size">
            <Modal.Header closeButton>
                <Modal.Title>
                    {restaurant
                        ? "Image for restaurant " + restaurant.name
                        : "Loading..."}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {err ? <p>{err}</p> : <></>}
                <Form>
                    <InputField
                        divClassName="option-card"
                        value={title}
                        onChange={setTitle}
                        type="text"
                        isTitle
                    />
                    <div style={{ maxWidth: "50%" }}>
                        <InputField
                            divClassName="option-card"
                            value={url}
                            onChange={setUrl}
                            type="text"
                            isImage
                            image={imageSrc}
                            setImage={setImageSrc}
                        />
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {loading ? (
                    <Button variant="primary" disabled>
                        Loading...
                    </Button>
                ) : (
                    <Button variant="primary" onClick={submit}>
                        Save Changes
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
