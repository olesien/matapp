import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from '../HomePage'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from '../../contexts/AuthContext'

test("alert shows error message when searching for a location", async () => {
    render(
        <BrowserRouter>
            <AuthContextProvider>
                <HomePage />
            </AuthContextProvider>
        </BrowserRouter>
    )

    // find restaurant list tab
    const restaurantListTabEl = await screen.findByText('Restaurant List')

    // click on tab
    userEvent.click(restaurantListTabEl)

    // find search input field
    const searchInputFieldEl = await screen.findByPlaceholderText('Search for a city/location')

    // // find 'search' button
    const searchButtonEl = await screen.findByRole('button', { name: /search/i })

    // type 'Stockholm' into form and click the 'search' button
    userEvent.type(searchInputFieldEl, 'Stockholm')
    userEvent.click(searchButtonEl)

    // find alert
    const alertEl = await screen.findByRole('alert')

    // assert that alert shows error message
    expect(alertEl).toHaveTextContent('No restaurants for that location was found in our database.')
})

it("can filter restaurants by category", async () => {
    render(
        <BrowserRouter>
            <AuthContextProvider>
                <HomePage />
            </AuthContextProvider>
        </BrowserRouter>
    )

    // find restaurant list tab
    const restaurantListTabEl = await screen.findByText('Restaurant List')

    // click on tab
    userEvent.click(restaurantListTabEl)

     // // find 'filter' button
     const filterButtonEl = await screen.findByRole('button', { name: /filter/i })
    //  console.log(filterButtonEl)

    // click on 'show all' button

    // assert that restaurant list shows all restaurants
})