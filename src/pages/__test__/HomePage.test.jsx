import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import HomePage from '../HomePage'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from '../../contexts/AuthContext'

test("restaurant list is initially empty", () => {
    render(
        <BrowserRouter>
            <AuthContextProvider>
                <HomePage />
            </AuthContextProvider>
        </BrowserRouter>
    )

    // find restaurant list
    // const listEl = screen.getByTestId('restaurant-list')

    // expect list to be empty
})

test("restaurant list shows all restaurants when 'show all' button is clicked", () => {
    render(
        <BrowserRouter>
            <AuthContextProvider>
                <HomePage />
            </AuthContextProvider>
        </BrowserRouter>
    )

    // find restaurant list

    // find 'show all' button

    // click on 'show all' button

    // assert that restaurant list shows all restaurants
})