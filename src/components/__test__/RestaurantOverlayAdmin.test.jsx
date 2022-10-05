import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RestaurantOverlayAdmin from "../RestaurantOverlayAdmin";
import AuthContextProvider from "../../contexts/AuthContext";

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

test("that modal is shown", async () => {
    render(
        <AuthContextProvider>
            <RestaurantOverlayAdmin
                restaurant={mockData}
                handleClose={() => null}
            />
        </AuthContextProvider>
    );

    const modalTitle = await screen.findByText("Restaurant");
    expect(modalTitle).toBeInTheDocument();
});

test("that restaurant name exists", async () => {
    render(
        <AuthContextProvider>
            <RestaurantOverlayAdmin
                restaurant={mockData}
                handleClose={() => null}
            />
        </AuthContextProvider>
    );
    const modalName = await screen.findByText("testing title");

    expect(modalName).toBeInTheDocument();
});

test("that restaurant name changes to form when clicked", async () => {
    render(
        <AuthContextProvider>
            <RestaurantOverlayAdmin
                restaurant={mockData}
                handleClose={() => null}
            />
        </AuthContextProvider>
    );
    const modalName = await screen.findByText("testing title");

    await userEvent.click(modalName);

    const modalInput = screen.getByDisplayValue("testing title");
    expect(modalInput).toBeInTheDocument();
});

test("that restaurant namee changes when it's edited", async () => {
    render(
        <AuthContextProvider>
            <RestaurantOverlayAdmin
                restaurant={mockData}
                handleClose={() => null}
            />
        </AuthContextProvider>
    );
    const modalName = await screen.findByText("testing title");

    await userEvent.click(modalName);

    const modalInput = screen.getByDisplayValue("testing title");
    await userEvent.clear(modalInput);
    await userEvent.type(modalInput, "A new title!");

    const eyeIcon = screen.getByTestId("close-name");
    console.log(eyeIcon);
    await userEvent.click(eyeIcon);

    const newModalName = screen.getByText("A new title!");
    expect(newModalName).toBeInTheDocument();
});
