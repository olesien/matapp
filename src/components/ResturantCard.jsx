import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ResturantCard({ resturant }) {
    //console.log(resturant);
    if (!resturant) {
        return <div></div>;
    }
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={resturant.url} />
            <Card.Body>
                <Card.Title>{resturant.name}</Card.Title>
                <Card.Text>{resturant.description}</Card.Text>
                <Card.Text>Offers: {resturant.offers}</Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
    );
}
