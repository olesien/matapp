import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const FilterRestaurants = ({ handleSetFilterOptions }) => {
    const [selectedType, setSelectedType] = useState("")
    const [selectedServing, setSelectedServing] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSetFilterOptions({
            option1: selectedType,
            option2: selectedServing
        })
    }

    return (
        <div className="mt-3 mb-2">
            <Form name="restaurant-filter-form" onSubmit={handleSubmit}>
                <div className="my-2">
                    <Form.Label htmlFor='type-select'>Type of restaurant</Form.Label>
                    <Form.Select name='type-select' value={selectedType} onChange={e => setSelectedType(e.target.value)} id='type-select'>
                        <option value={""}>Please select an option</option>
                        <option value={"restaurant"}>Restaurant</option>
                        <option value={"café"}>Café</option>
                        <option value={"fast_food"}>Fast Food</option>
                        <option value={"food_truck"}>Food Truck</option>
                    </Form.Select>
                </div>
                <div className="my-2">
                    <Form.Label htmlFor='serving-select'>Serving</Form.Label>
                    <Form.Select name='serving-select' value={selectedServing} onChange={e => setSelectedServing(e.target.value)} id='serving-select'>
                        <option value={""}>Please select an option</option>
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