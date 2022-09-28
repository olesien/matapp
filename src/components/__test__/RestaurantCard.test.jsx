import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RestaurantCard from '../RestaurantCard'
import { restaurants } from './test_data.json'

it("renders information about restaurant in card", () => {
    render(
        <BrowserRouter>
            <RestaurantCard restaurant={restaurants[1]} />
        </BrowserRouter>
    )

    const cardTitleEl = screen.getByText(restaurants[1].name)
    console.log(cardTitleEl)

    expect(cardTitleEl).toBeInTheDocument()
})