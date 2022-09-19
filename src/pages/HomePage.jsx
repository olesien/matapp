import Container from "react-bootstrap/Container";
import RestaurantList from "../components/RestaurantList";

const HomePage = () => {
    return (
        <Container className="py-3">
            <h1>Welcome!</h1>
            <RestaurantList />
        </Container>
    );
};

export default HomePage;
