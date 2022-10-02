import { Container, Row, Col, Card } from "react-bootstrap";
import CreateRestaurantForm from "../components/CreateRestaurantForm";

const CreateRestaurantPage = () => {
    return (
        <Container className="py-3 center-y">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Header as="h5">Create a new restaurant</Card.Header>
                        <Card.Body>
                            <CreateRestaurantForm />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateRestaurantPage;
