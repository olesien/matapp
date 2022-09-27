import { render, screen } from "@testing-library/react";
import RestaurantList from "../RestaurantList";
import { BrowserRouter } from 'react-router-dom'

test("restaurants are rendered in cards", async () => {

    const restaurants = [
        {
            "id": "template_restaurant",
            "offers": "lunch",
            "offer": [
                ""
            ],
            "cuisine": [
                ""
            ],
            "place": "Malmö",
            "name": "Best Restaurant",
            "position": {
                "_lat": 23.772,
                "_long": -117.214
            },
            "category": [
                "Restaurant"
            ],
            "description": "A restaurant",
            "address": "Gatan 5, 123 45",
            "type_of_establishment": "restaurant",
            "url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102"
        },
        {
            "id": "O8y7RILVd2Y8whTTk6bY",
            "description": "Fine dining for friends and family",
            "createdBy": "WNqPbkY4BnOAocyUW2VUwnXZsLe2",
            "website": "",
            "postcode": 0,
            "cuisine": "Italian",
            "url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
            "position": {
                "_lat": 12,
                "_long": 34
            },
            "facebook": "www.facebook.com/burgerqueenrestaurant",
            "offer": "Lunch",
            "instagram": "www.instagram.com/burgerqueenrestaurant",
            "name": "Burger Queen",
            "location": {
                "_lat": 12,
                "_long": 34
            },
            "email": "",
            "city": "Royaltown",
            "offers": "lunch",
            "phone": "070123456",
            "address": "Queen Street 4B",
            "photoURL": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
            "category": [
                "Restaurant"
            ],
            "type_of_establishment": "restaurant"
        },
        {
            "id": "ufm0yPjjeAHkzvCIulJD",
            "website": "examplerestaurant.com",
            "url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
            "city": "Malmö",
            "offers": "lunch",
            "category": [
                "Bar",
                "Restaurant"
            ],
            "photoURL": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
            "postcode": 21114,
            "facebook": "facebook.com/examplerestaurant",
            "cuisine": [
                "Italian",
                "Mediterranean"
            ],
            "offer": [
                "Lunch",
                "Dinner"
            ],
            "instagram": "instagram.com/examplerestaurant",
            "type_of_establishment": "restaurant",
            "name": "Example Restaurant",
            "location": {
                "_lat": 16,
                "_long": 132
            },
            "address": "Drottninggatan 4B",
            "position": {
                "_lat": 16,
                "_long": 132
            },
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet varius est, in fringilla metus.",
            "tel": "+46123456789",
            "email": "info@examplerestaurant.com"
        },
        {
            "id": "NJU3cUfQhqE5BdCqY8ec",
            "city": "Hamburgertown",
            "location": {
                "_lat": 12,
                "_long": 34
            },
            "description": "Fast food",
            "instagram": "www.instagram.com/burgers",
            "offer": "Fine dining",
            "email": "info@burger.com",
            "cuisine": "American",
            "url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
            "address": "Burgergatan 3 3D",
            "name": "McDonalds",
            "postcode": "65432",
            "facebook": "www.facebook.com/burgers",
            "createdBy": "WNqPbkY4BnOAocyUW2VUwnXZsLe2",
            "position": {
                "_lat": 12,
                "_long": 34
            },
            "photoURL": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
            "phone": "010256849",
            "category": "Restaurant",
            "type_of_establishment": "restaurant",
            "website": "www.burgers.com",
            "offers": "lunch"
        },
        {
            "id": "sw5gFR2rr52Ki0ZSfuvP",
            "position": {
                "_lat": 33.772,
                "_long": -116.214
            },
            "description": "Test description",
            "type_of_establishment": "café",
            "name": "Test name",
            "offer": [
                ""
            ],
            "offers": "lunch",
            "createdBy": "WNqPbkY4BnOAocyUW2VUwnXZsLe2",
            "cuisine": [
                ""
            ],
            "category": [
                "Restaurant"
            ],
            "url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102"
        },
        {
            "id": "5ZvfgzMFWR0lUEM3nYIO",
            "description": "Lorem ipsum",
            "email": "",
            "tel": "",
            "name": "Testing 2",
            "address": "",
            "offer": [
                ""
            ],
            "photoURL": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
            "createdBy": "WNqPbkY4BnOAocyUW2VUwnXZsLe2",
            "url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
            "postcode": 0,
            "city": "",
            "offers": "lunch",
            "cuisine": [
                ""
            ],
            "location": {
                "_lat": 12,
                "_long": 34
            },
            "type_of_establishment": "restaurant",
            "instagram": "",
            "position": {
                "_lat": 12,
                "_long": 34
            },
            "facebook": "",
            "website": "",
            "category": [
                "Restaurant"
            ]
        },
        {
            "id": "template_resturant2",
            "address": "GATAN 6, 12365",
            "name": "Worst Restaurant",
            "offer": [
                ""
            ],
            "position": {
                "_lat": 74.772,
                "_long": -116.214
            },
            "type_of_establishment": "restaurant",
            "cuisine": [
                ""
            ],
            "place": "Shanghai",
            "category": [
                "Restaurant"
            ],
            "offers": "dinner",
            "description": "Not a restaurant",
            "url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102"
        }
    ]
    const sortBy = false
    const userLocation = { lat: 12, lng: 34 }

    // render
    render(
        <BrowserRouter>
            <RestaurantList
                restaurants={restaurants}
                userLocation={userLocation}
                sortByName={sortBy}
            />
        </BrowserRouter>
    )

    // find
    const restaurantCardEls = await screen.findAllByTestId('card')

    // assert
    expect(restaurantCardEls.length).toBeGreaterThanOrEqual(1)

})
