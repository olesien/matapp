import { render, screen } from "@testing-library/react";
import RestaurantList from "../RestaurantList";
import { BrowserRouter } from 'react-router-dom'
import {restaurants, sortBy, userLocation} from './test_data.json'

test("restaurants are rendered in cards", async () => {
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
