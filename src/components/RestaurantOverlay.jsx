import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
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
    const { currentUser } = useAuthContext();
    console.log(restaurant);
    if (customRestaurant) {
        restaurant = customRestaurant;
    }
    console.log(restaurant);

    const handleClose = () => {
        //Handle close
        // let values = {};
        const oldParams = {};
        //Get all previous params
        // for (let entry of searchParams.entries()) {
        //     if (!entry[0] === "viewRestaurant") values[entry[0]] = entry[1];
        // }
        // Getting all params in the url except viewRestaurant.
        // This causes the overlay to disappear when the params are set.
        searchParams.forEach((value, key) => {
            if (key !== "viewRestaurant") {
                oldParams[key] = value;
            }
        });
        // console.log("Values when closing overlay", oldParams);
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
                                        {restaurant?.address},{" "}
                                        {restaurant?.city}
                                    </p>
                                    <RestaurantImages id={restaurantId} />
                                </div>
                            </div>
                            <div className="restaurant-row">
                                {restaurant?.category ? (
                                    <>
                                        <h3>Category</h3>
                                        <p>{restaurant.category}</p>
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
                                        <p>{restaurant.website}</p>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {restaurant?.facebook ? (
                                    <>
                                        <h3>Facebook</h3>
                                        <p>{restaurant.facebook}</p>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {restaurant?.instagram ? (
                                    <>
                                        <h3>Instagram</h3>
                                        <p>{restaurant.instagram}</p>
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
