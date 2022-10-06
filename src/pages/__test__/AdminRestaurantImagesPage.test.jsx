import { render, screen } from "@testing-library/react";
import AdminRestaurantImagesPage from '../AdminRestaurantImagesPage'
import AuthContextProvider from '../../contexts/AuthContext'

test("table is initially empty", async () => {
    render(
        <AuthContextProvider>
            <AdminRestaurantImagesPage />
        </AuthContextProvider>
    )

    // find table
    const tableEls = await screen.findAllByRole('rowgroup')

    // find table body
    const tbodyEl = tableEls[1]

    // expect table body to be empty
    expect(tbodyEl).toBeEmptyDOMElement()
})
