import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RestaurantCard from '../RestaurantCard'

it("renders information about restaurant in card", () => {
    const restaurant = {
        "id": "template_restaurant",
        "offers": "lunch",
        "description": "A restaurant",
        "position": {
            "latitude": 23.772,
            "longitude": -117.214
        },
        "address": "Gatan 5, 123 45",
        "url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
        "cuisine": [
            ""
        ],
        "name": "Best Restaurant",
        "place": "Malmö",
        "offer": [
            ""
        ],
        "type_of_establishment": "restaurant",
        "category": [
            "Restaurant"
        ]
    }

    render(
        <BrowserRouter>
            <RestaurantCard restaurant={restaurant} />
        </BrowserRouter>
    )

    const cardTitleEl = screen.getByText(restaurant.name)
    console.log(cardTitleEl)

    expect(cardTitleEl).toBeInTheDocument()
})