import { render, screen } from "@testing-library/react";
import AdminRestaurantImagesPage from '../AdminRestaurantImagesPage'

test("table is initially empty", async () => {
    render(<AdminRestaurantImagesPage />)

    // find table
    const tableEls = await screen.findAllByRole('rowgroup')

    // find table body
    const tbodyEl = tableEls[1]

    // expect table body to be empty
    expect(tbodyEl).toBeEmptyDOMElement()
})