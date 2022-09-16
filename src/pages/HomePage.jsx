import Container from "react-bootstrap/Container";
import Map from "../components/Map";

const HomePage = () => {
    return (
        <Container className="py-3">
            <h1>Welcome!</h1>
            <Map />
        </Container>
    );
};

export default HomePage;
