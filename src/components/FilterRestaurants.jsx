import { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const FilterRestaurants = ({ handleSetSearchParams, filterOptions }) => {
    // state for controlled form input
    const [selectedType, setSelectedType] = useState(filterOptions.type ? filterOptions.type : "")
    const [selectedServing, setSelectedServing] = useState(filterOptions.offering ? filterOptions.offering : "")

    const handleSubmit = (e) => {
        e.preventDefault()

        // Set filter options based on input from user
        handleSetSearchParams({
            type: selectedType,
            offering: selectedServing
        })
    }

    // Make sure the dropdown inputs have the correct values if the user navigates to the page 
    // via url or using the browser history buttons.
    useEffect(() => {
        setSelectedType(filterOptions.type ? filterOptions.type : "")
        setSelectedServing(filterOptions.offering ? filterOptions.offering : "")
    }, [filterOptions])

    return (
        <div className="mt-3 mb-2">
            <Form name="restaurant-filter-form" onSubmit={handleSubmit}>
                <div className="my-2">
                    <Form.Label htmlFor='type-select'>Category</Form.Label>
                    <Form.Select name='type-select' value={selectedType} onChange={e => setSelectedType(e.target.value)} id='type-select'>
                        <option value={""} disabled>Please select an option</option>
                        <option value={"restaurant"}>Restaurant</option>
                        <option value={"café"}>Café</option>
                        <option value={"fast_food"}>Fast Food</option>
                        <option value={"food_truck"}>Food Truck</option>
                    </Form.Select>
                </div>
                <div className="my-2">
                    <Form.Label htmlFor='serving-select'>Offer</Form.Label>
                    <Form.Select name='serving-select' value={selectedServing} onChange={e => setSelectedServing(e.target.value)} id='serving-select'>
                        <option value={""} disabled>Please select an option</option>
                        <option value={"lunch"}>Lunch</option>
                        <option value={"dinner"}>Dinner</option>
                    </Form.Select>
                </div>
                <Button className='me-2' type='submit'>Submit</Button>
                <Button onClick={() => {
                    setSelectedType("")
                    setSelectedServing("")
                }
                }>Reset</Button>
            </Form>
        </div>
    )
}

export default FilterRestaurants