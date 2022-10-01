import { Container } from "react-bootstrap";
import CreateRestaurantForm from "../components/CreateRestaurantForm";

const CreateRestaurantPage = () => {
    return (
        <Container className="py-3">
            <h1>Create a new restaurant</h1>
            <CreateRestaurantForm />
        </Container>
    );
};

export default CreateRestaurantPage;
