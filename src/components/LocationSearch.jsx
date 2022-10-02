import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LocationSearch = ({ restaurants }) => {
    const [searchedLocation, setSearchedLocation] = useState("")
    const inputSuggestions = []
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    console.log("inputSuggestions:", inputSuggestions)
    console.log("filteredSuggestions:", filteredSuggestions)

    restaurants.forEach(restaurant => {
        if (restaurant?.place) {
            inputSuggestions.push({
                place: restaurant.place,
                id: restaurant.id
            })
        }
    });

    const onSearchFormSubmit = (e) => {
        e.preventDefault()
    }

    const onInputChanged = (e) => {
        setSearchedLocation(e.target.value)
        const filtered = e.target.value !== ""
            ? inputSuggestions.filter(suggestion => (
                suggestion.place.startsWith(e.target.value)
            ))
            : []
        console.log(filtered)
        setFilteredSuggestions(filtered)
    }

    return (
        <Form name="restaurant-filter-form" onSubmit={onSearchFormSubmit} >
            <div className="my-2">
                {/* <Form.Label htmlFor=''>Search</Form.Label> */}
                <Form.Control
                    name='city-search'
                    value={searchedLocation}
                    onChange={(e) => onInputChanged(e)}
                    id='city-search' />
            </div>
            <ul>
                {filteredSuggestions && (
                    filteredSuggestions.map((suggestion) => (
                        <li key={suggestion.id} onClick={() => setSearchedLocation(suggestion.place)}>{suggestion.place}</li>
                    )))
                }
            </ul>
            <Button className='me-2' type='search'>Search</Button>
        </Form >
    )
}
export default LocationSearch