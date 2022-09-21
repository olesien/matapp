import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const FilterRestaurants = ({ handleSetFilterOptions }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        handleSetFilterOptions({
            option1: e.target[0].value,
            option2: e.target[1].value
        })
    }

    return (
        <div className="mt-3 mb-2">
            <Form onSubmit={handleSubmit}>
                <div className="my-2">
                    <Form.Label htmlFor='type-select'>Type of restaurant</Form.Label>
                    <Form.Select id='type-select'>
                        <option value={""}>Please select an option</option>
                        <option value={"restaurant"}>Restaurant</option>
                        <option value={"café"}>Café</option>
                        <option value={"fast_food"}>Fast Food</option>
                        <option value={"food_truck"}>Fast Truck</option>
                    </Form.Select>
                </div>
                <div className="my-2">
                    <Form.Label htmlFor='serving-select'>Serving</Form.Label>
                    <Form.Select id='serving-select'>
                        <option value={""}>Please select an option</option>
                        <option value={"lunch"}>Lunch</option>
                        <option value={"dinner"}>Dinner</option>
                    </Form.Select>
                </div>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default FilterRestaurants