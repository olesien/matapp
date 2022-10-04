import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSearchParams } from "react-router-dom";

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
}) {
    const [searchParams, setSearchParams] = useSearchParams();

    //console.log(resturant);
    if (!restaurant) {
        return <div></div>;
    }
    // const { isLoading, data: geocode } = useQuery(
    //     [restaurant.id, restaurant.position._lat, restaurant.position._long],
    //     GeocodingAPI.getReverseGeocode
    // );

    // if (isLoading) {
    //     return <div></div>;
    // }
    // console.log(geocode);

    const viewOnMap = () => {
        //Set new tab and map ID
        setSearchParams({ tab: "map", id: restaurant.id });
    };
    const getDirections = async () => {
        console.log("directions");

        let fromPlace = "Malmö";
        const { lat, lng } = userLocation;
        const geocode = await GeocodingAPI.getReverseGeocodeAsync(lat, lng);
        console.log(geocode);
        if (geocode && "results" in geocode && geocode.results.length > 0) {
            fromPlace = geocode.results[0];
        }
        const toPlace = (restaurant.address + ",+" + restaurant.city).replace(
            " ",
            "+"
        );
        window.location.href = `https://www.google.com/maps/dir/${fromPlace}/${toPlace}/`;
    };

    const view = async () => {
        console.log("view");
        let values = {};
        //Get all previous params
        for (let entry of searchParams.entries()) {
            values[entry[0]] = entry[1];
        }
        console.log(values);
        setSearchParams({ ...values, viewRestaurant: restaurant.id });
    };
    return (
        <Card data-testid="card" style={{ width: "18rem", margin: "1rem" }}>
            <Card.Header>
                Distance: {convertUnits(restaurant.distance)}
            </Card.Header>
            <Card.Img variant="top" src={restaurant.url} />
            <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>📍 {restaurant.place}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                    {restaurant.cuisine}
                </Card.Subtitle>
                <Card.Text>
                    {restaurant.type_of_establishment} offering{" "}
                    {restaurant.offers}
                </Card.Text>
                {/* <Card.Text>{geocode.results[0]?.formatted_address}</Card.Text> */}
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
        </Card>
    );
}
