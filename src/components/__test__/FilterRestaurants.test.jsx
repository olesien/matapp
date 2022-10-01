import { render, screen } from "@testing-library/react";
import FilterRestaurants from "../FilterRestaurants"
import userEvent from '@testing-library/user-event'

const filterOptions = {
    type: "",
    offering: "",
    listAll: false
}

test("The current values of the dropdown forms can be changed", async () => {
    // render
    render(<FilterRestaurants filterOptions={filterOptions} />)

    // find
    const typeDropdown = screen.getByLabelText(/type of restaurant/i)
    const offeringDropdown = screen.getByLabelText(/serving/i)

    // interact
    await userEvent.selectOptions(typeDropdown, ["restaurant"])
    await userEvent.selectOptions(offeringDropdown, ["lunch"])

    // assert

    expect(screen.getByRole('option', { name: /restaurant/i }).selected).toBe(true)
    expect(screen.getByRole('option', { name: /lunch/i }).selected).toBe(true)
})

test("The form has the corresponding values from the input fields", async () => {
    // render
    render(<FilterRestaurants filterOptions={filterOptions} />)

    // find
    const typeDropdown = screen.getByLabelText(/type of restaurant/i)
    const offeringDropdown = screen.getByLabelText(/serving/i)

    // interact
    await userEvent.selectOptions(typeDropdown, ["restaurant"])
    await userEvent.selectOptions(offeringDropdown, ["lunch"])

    // assert
    expect(screen.getByRole('form')).toHaveFormValues({
        "type-select": "restaurant",
        "serving-select": "lunch"
    })
})