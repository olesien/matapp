import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "react-query";
import GeocodingAPI from "../services/GeocodingAPI";

const convertUnits = (distance) => {
    if (distance >= 1000) {
        //convert to KM
        return `${Math.round(distance / 1000)}KM`;
    } else {
        //keep as is
        return `${distance}M`;
    }
};

export default function RestaurantCard({ restaurant }) {
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
    return (
        <Card data-testid="card" style={{ width: "18rem", margin: "1rem" }}>
            <Card.Img variant="top" src={restaurant.url} />
            <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                {/* <Card.Text>{geocode.results[0]?.formatted_address}</Card.Text> */}
                <Card.Text>{restaurant.place}</Card.Text>
                <Card.Text>
                    Distance: {convertUnits(restaurant.distance)}
                </Card.Text>
                <Card.Text>{restaurant.description}</Card.Text>
                <Card.Text>Offers: {restaurant.offers}</Card.Text>
                <Card.Text>Type: {restaurant.type_of_establishment}</Card.Text>
                <footer>
                    <Button variant="primary" onClick={() => viewOnMap()}>
                        View on Map
                    </Button>
                </footer>
            </Card.Body>
        </Card>
    );
}
