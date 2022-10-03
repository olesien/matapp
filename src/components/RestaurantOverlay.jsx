import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Image } from "react-bootstrap";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import useGetRestaurant from "../hooks/useGetRestaurant";

export default function RestaurantOverlay() {
    const [searchParams, setSearchParams] = useSearchParams();

    const restaurantId = searchParams.get("viewRestaurant");
    const { data: restaurant, loading } = useGetRestaurant(restaurantId);

    console.log(restaurant);

    const handleClose = () => {
        //Handle close
        let values = {};
        //Get all previous params
        for (let entry of searchParams.entries()) {
            if (!entry[0] === "viewRestaurant") values[entry[0]] = entry[1];
        }
        console.log(values);
        setSearchParams({ ...values });
    };
    if (!restaurantId) return <></>;

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
                        <Modal.Title>Restaurant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="restaurant-overlay-card">
                            <div className="restaurant-row">
                                <div className="option-card">
                                    <h2>{restaurant?.name}</h2>

                                    <Image src={restaurant?.url} />

                                    <p>{restaurant?.description}</p>
                                    <p>
                                        {restaurant?.address},{" "}
                                        {restaurant?.city}
                                    </p>
                                </div>
                            </div>
                            <div className="restaurant-row">
                                <p>{restaurant?.category}</p>
                                <p>{restaurant?.email}</p>
                            </div>
                            <div className="restaurant-row">
                                <p>{restaurant?.website}</p>
                                <p>{restaurant?.facebook}</p>

                                <p>{restaurant?.instagram}</p>
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
