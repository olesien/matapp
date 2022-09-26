import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSearchParams } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
    const [searchParams, setSearchParams] = useSearchParams();
    //console.log(resturant);
    if (!restaurant) {
        return <div></div>;
    }
    const viewOnMap = () => {
        //Set new tab and map ID
        setSearchParams({ tab: "map", id: restaurant.id });
    };
    return (
        <Card style={{ width: "18rem", margin: "1rem" }}>
            <Card.Img variant="top" src={restaurant.url} />
            <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
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
