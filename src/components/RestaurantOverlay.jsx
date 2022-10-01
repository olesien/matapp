import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function RestaurantOverlay({ restaurant, handleClose }) {
    console.log(restaurant);
    const [title, setTitle] = useState(restaurant?.title);
    const [url, setUrl] = useState(restaurant?.url);
    const [description, setDescription] = useState(restaurant?.description);
    const [category, setCategory] = useState(restaurant?.category);
    const [email, setEmail] = useState(restaurant?.email);
    const [phone, setPhone] = useState(restaurant?.phone);
    const [site, setSite] = useState(restaurant?.website);
    const [facebook, setFacebook] = useState(restaurant?.facebook);
    const [instagram, setInstagram] = useState(restaurant?.instagram);

    useEffect(() => {
        setTitle(restaurant?.name);
        setUrl(restaurant?.url);
        setDescription(restaurant?.description);
        setEmail(restaurant?.email);
        setCategory(restaurant?.category);
        setPhone(restaurant?.phone);
        setSite(restaurant?.website);
        setFacebook(restaurant?.facebook);
        setInstagram(restaurant?.instagram);
    }, [restaurant]);

    const submit = async () => {
        const restaurantRef = doc(db, "restaurants", restaurant.id);

        try {
            await updateDoc(restaurantRef, {
                title,
                description,
                category,
                email,
                phone,
                website: site,
                facebook,
                instagram,
            });
            console.log("Succesfully updated");
            toast.success("Restaurant Edited!");
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Modal
            show={restaurant}
            onHide={handleClose}
            dialogClassName="modal-size"
        >
            <Modal.Header closeButton>
                <Modal.Title>Restaurant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="restaurant-overlay-card">
                    <div className="restaurant-row">
                        <div className="option-card">
                            <InputField
                                divClassName="option-card"
                                value={title}
                                onChange={setTitle}
                                type="text"
                                isTitle
                            />
                            {/* <Image src={restaurant?.url} /> */}
                            <InputField
                                divClassName="option-card"
                                value={url}
                                onChange={setUrl}
                                type="text"
                                isImage
                            />

                            <InputField
                                divClassName="option-card"
                                value={description}
                                onChange={setDescription}
                                type="text"
                            />
                            <p>
                                {restaurant?.address}, {restaurant?.city}
                            </p>
                        </div>
                    </div>
                    <div className="restaurant-row">
                        {/* <div className="option-card">
                            <p>Type</p>
                            <ul>
                                <li>Cafe</li>
                                <li>Restaurant</li>
                            </ul>
                        </div> */}
                        <InputField
                            divClassName="option-card"
                            value={category}
                            onChange={setCategory}
                            type="text"
                            title="Type"
                        />
                        <InputField
                            divClassName="option-card"
                            value={email}
                            onChange={setEmail}
                            type="email"
                            title="Email"
                        />
                        <InputField
                            divClassName="option-card"
                            value={phone}
                            onChange={setPhone}
                            type="text"
                            title="Phone Number"
                        />
                    </div>
                    <div className="restaurant-row">
                        <InputField
                            divClassName="option-card"
                            value={site}
                            onChange={setSite}
                            type="text"
                            title="Website"
                        />
                        <InputField
                            divClassName="option-card"
                            value={facebook}
                            onChange={setFacebook}
                            type="text"
                            title="Facebook"
                        />
                        <InputField
                            divClassName="option-card"
                            value={instagram}
                            onChange={setInstagram}
                            type="text"
                            title="Instagram"
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
