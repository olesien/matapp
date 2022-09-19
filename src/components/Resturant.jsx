import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Resturant({ resturant }) {
    //console.log(resturant);
    if (!resturant) {
        return <div></div>;
    }
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={resturant.url} />
            <Card.Body>
                <Card.Title>{resturant.name}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}
