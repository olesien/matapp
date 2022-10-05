import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import RestaurantOverlay from "../RestaurantOverlay";

const mockData = {
    id: "18k9hCsfCZNKB2sKY8bD",
    cuisine: "not",
    offers: "lunch",
    address: "does this",
    phone: "123",
    offer: "lunch",
    category: "restaurants2",
    url: "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
    type_of_establishment: "restaurant",
    position: {
        latitude: 12,
        longitude: 34,
    },
    email: "test@ing.com",
    description: "or...",
    createdBy: 0,
    instagram: "www.instagram.com/out",
    website: "lets",
    postcode: "12345",
    place: "Ystad",
    city: "work",
    approved: true,
    photoURL:
        "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
    name: "testing title",
    facebook: "www.facebook.com/find",
    location: {
        latitude: 12,
        longitude: 34,
    },
    title: "testing title",
};

test("that modal is shown", () => {
    render(
        <MemoryRouter>
            <RestaurantOverlay customRestaurant={mockData} />
        </MemoryRouter>
    );
    const modalName = screen.getByText("testing title");

    expect(modalName).toBeInTheDocument();
});
