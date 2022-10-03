import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";

export default function ImageOverlayAdmin({ image, handleClose }) {
    const [title, setTitle] = useState(image?.title);
    const [url, setUrl] = useState(image?.imageurl);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        setTitle(image?.title);
        setUrl(image?.imageurl);
    }, [image]);
    const submit = async () => {
        const imageRef = doc(db, "user-pictures", image.id);

        try {
            let imageurl = image.imageurl;
            if (imageSrc) {
                console.log("uploading image");
                const fileRef = ref(
                    storage,
                    `photos/${image.userid}/${Date.now() + "-" + title}`
                );

                // upload photo to fileRef
                const uploadResult = await uploadBytes(fileRef, imageSrc);

                // get download url to uploaded file
                imageurl = await getDownloadURL(uploadResult.ref);
            }
            await updateDoc(imageRef, {
                title,
                imageurl,
            });

            console.log("Succesfully updated");
            toast.success("Image Edited!");
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Modal show={image} onHide={handleClose} dialogClassName="modal-size">
            <Modal.Header closeButton>
                <Modal.Title>Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <InputField
                        divClassName="option-card"
                        value={title}
                        onChange={setTitle}
                        type="text"
                        isTitle
                    />
                    {/* <Image src={restaurant?.url} /> */}
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
                <Button variant="primary" onClick={submit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
