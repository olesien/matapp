import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function RestaurantOverlay({ restaurant, handleClose }) {
    console.log(restaurant);
    return (
        <Modal show={restaurant} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>{restaurant?.name}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
