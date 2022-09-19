import Container from "react-bootstrap/Container";
import Map from "../components/Map";
import RestaurantList from "../components/RestaurantList";

const HomePage = () => {
    return (
        <Container className="py-3">
            <h1>Welcome!</h1>
            <Map />
            <RestaurantList />
        </Container>
    );
};

export default HomePage;
