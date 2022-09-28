import { Container } from "react-bootstrap";
import CreateRestaurantForm from "../components/CreateRestaurantForm";

const SuggestionPage = () => {
    return (
        <Container className="py-3">
            <h1>Suggest a restaurant</h1>
            <CreateRestaurantForm />
        </Container>
    );
};

export default SuggestionPage;
