import { render, screen } from "@testing-library/react";
import FilterRestaurants from "../FilterRestaurants"
import userEvent from '@testing-library/user-event'

test("The current values of the dropdown forms can be changed", async () => {
    // render
    render(<FilterRestaurants />)

    // find
    const typeDropdown = screen.getByLabelText(/type of restaurant/i)
    const offeringDropdown = screen.getByLabelText(/serving/i)

    // interact
    await userEvent.selectOptions(typeDropdown, ["restaurant"])
    await userEvent.selectOptions(offeringDropdown, ["lunch"])
    
    // assert
    
    expect(screen.getByRole('option', {name: /restaurant/i}).selected).toBe(true)
    expect(screen.getByRole('option', {name: /lunch/i}).selected).toBe(true)
})