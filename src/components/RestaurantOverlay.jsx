import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import { useState } from "react";
import RestaurantImages from "./RestaurantImages";
import { useSearchParams } from "react-router-dom";
import useGetRestaurant from "../hooks/useGetRestaurant";
import SubmitRestaurantImage from "./SubmitRestaurantImage";
import { useAuthContext } from "../contexts/AuthContext";

export default function RestaurantOverlay({ customRestaurant = null }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const restaurantId = searchParams.get("viewRestaurant");
    const { data, loading } = useGetRestaurant(restaurantId);
    const [newImage, setNewImage] = useState(false);
    let restaurant = data;
    //for testing
    const { currentUser } = useAuthContext();
    if (customRestaurant) {
        restaurant = customRestaurant;
    }

    const handleClose = () => {
        const oldParams = {};
        // Getting all params in the url except viewRestaurant.
        // This causes the overlay to disappear when the params are set.
        searchParams.forEach((value, key) => {
            if (key !== "viewRestaurant") {
                oldParams[key] = value;
            }
        });
        setSearchParams({ ...oldParams });
    };
    if (!restaurantId && !customRestaurant) return <></>;

    return (
        <Modal
            show={restaurant}
            onHide={handleClose}
            dialogClassName="modal-size"
        >
            {loading ? (
                <Modal.Header closeButton>
                    <Modal.Title>Loading...</Modal.Title>
                </Modal.Header>
            ) : (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>{restaurant?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="restaurant-overlay-card">
                            <div className="restaurant-row">
                                <div className="option-card">
                                    <Image src={restaurant?.photoURL} />

                                    <p>{restaurant?.description}</p>
                                    <p>
                                        📍 {restaurant?.address},{" "}
                                        {restaurant?.place}
                                    </p>
                                    <RestaurantImages id={restaurantId} />
                                </div>
                            </div>
                            <div className="restaurant-row">
                                {restaurant?.type_of_establishment ? (
                                    <>
                                        <h3>Category</h3>
                                        <p>
                                            {restaurant.type_of_establishment}
                                        </p>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {restaurant?.email ? (
                                    <>
                                        <h3>Email</h3>
                                        <p>{restaurant.email}</p>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="restaurant-row">
                                {restaurant?.website ? (
                                    <>
                                        <h3>Website</h3>
                                        <p>
                                            <a href={restaurant.website} target="_blank">{restaurant.website}</a>
                                        </p>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {restaurant?.facebook ? (
                                    <>
                                        <h3>Facebook</h3>
                                        <p>
                                            <a href={restaurant.facebook} target="_blank">{restaurant.facebook}</a>
                                        </p>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {restaurant?.instagram ? (
                                    <>
                                         <h3>Instagram</h3>
                                        <p>
                                            <a href={restaurant.instagram} target="_blank">{restaurant.instagram}</a>
                                        </p>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {currentUser ? (
                                    <>
                                        <Button
                                            onClick={() =>
                                                setNewImage(
                                                    (oldState) => !oldState
                                                )
                                            }
                                        >
                                            {newImage
                                                ? "Hide Form"
                                                : "Submit new image"}
                                        </Button>
                                        {newImage && (
                                            <SubmitRestaurantImage
                                                id={restaurantId}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <p>Login to add image!</p>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                </>
            )}

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
