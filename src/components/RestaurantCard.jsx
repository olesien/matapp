import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getDistance from "geolib/es/getDistance";

import GeocodingAPI from "../services/GeocodingAPI.js";

const convertUnits = (distance) => {
    if (distance >= 1000) {
        //convert to KM
        return `${Math.round(distance / 1000)}KM`;
    } else {
        //keep as is
        return `${distance}M`;
    }
};

export default function RestaurantCard({
    restaurant,
    fromMap = false,
    userLocation,
    mapReference,
    handleSetSearchParams,
    onClose,
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [distance, setDistance] = useState(restaurant?.distance);
    useEffect(() => {
        if (userLocation && restaurant && !distance) {
            setDistance(
                getDistance(
                    {
                        latitude: restaurant.position._lat,
                        longitude: restaurant.position._long,
                    },
                    {
                        latitude: userLocation.lat,
                        longitude: userLocation.lng,
                    }
                )
            );
        }
    }, [fromMap, restaurant, userLocation]);
    if (!restaurant) {
        return <div></div>;
    }

    const viewOnMap = () => {
        //Set new tab and map ID
        handleSetSearchParams({ tab: "map", id: restaurant.id });
        // Also running panTo here so that the map pans to the location
        // even if the id url param doesn't change
        mapReference.panTo({
            lat: restaurant.position.latitude,
            lng: restaurant.position.longitude,
        });
    };
    const getDirections = async () => {
        let fromPlace = "Malmö";
        const { lat, lng } = userLocation;
        const geocode = await GeocodingAPI.getReverseGeocodeAsync(lat, lng);
        if (geocode && "results" in geocode && geocode.results.length > 0) {
            fromPlace = geocode.results[0].formatted_address;
        }
        fromPlace.replace(" ", "+");
        const toPlace = (restaurant.address + ",+" + restaurant.place).replace(
            " ",
            "+"
        );

        window.location.href = `https://www.google.com/maps/dir/${fromPlace}/${toPlace}/`;
    };

    const view = async () => {
        let values = {};
        //Get all previous params
        for (let entry of searchParams.entries()) {
            values[entry[0]] = entry[1];
        }
        setSearchParams({ ...values, viewRestaurant: restaurant.id });
    };
    return (
        <Card data-testid="card" style={{ width: "18rem", margin: "1rem" }}>
            <Card.Header>
                Distance: {distance ? convertUnits(distance) : "Loading.."}
            </Card.Header>
            <Card.Img variant="top" src={restaurant.photoURL} />
            <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>📍 {restaurant.place}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                    {restaurant.cuisine} cuisine
                </Card.Subtitle>
                <Card.Text>"{restaurant.description}"</Card.Text>
                <footer>
                    {!fromMap && (
                        <Button
                            variant="primary"
                            style={{ margin: 5 }}
                            onClick={() => viewOnMap()}
                        >
                            See on Map
                        </Button>
                    )}

                    <Button
                        variant="primary"
                        style={{ margin: 5 }}
                        onClick={() => view()}
                    >
                        View
                    </Button>
                    <Button
                        variant="primary"
                        style={{ margin: 5 }}
                        onClick={() => getDirections()}
                    >
                        Get Directions
                    </Button>
                </footer>
            </Card.Body>
            <Card.Footer>
                {fromMap && (
                    <Button variant="primary" onClick={onClose}>
                        Close
                    </Button>
                )}
            </Card.Footer>
        </Card>
    );
}
