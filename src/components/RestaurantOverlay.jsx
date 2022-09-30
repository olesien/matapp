import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import InputField from "./InputField";

export default function RestaurantOverlay({ restaurant, handleClose }) {
    console.log(restaurant);
    const [description, setDescription] = useState(restaurant?.description);
    const [category, setCategory] = useState(restaurant?.category);
    const [email, setEmail] = useState(restaurant?.email);

    useEffect(() => {
        setDescription(restaurant?.description);
        setEmail(restaurant?.email);
        setCategory(restaurant?.category);
    }, [restaurant]);
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
                            <h2>{restaurant?.name}</h2>
                            <Image src={restaurant?.url} />

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
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
