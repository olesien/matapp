import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useGetRestaurants from "../hooks/useGetRestaurants";

const LocationSearch = ({ handleSetCityName }) => {
    const [searchedLocation, setSearchedLocation] = useState("")
    const inputSuggestions = []
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const { data: restaurants } = useGetRestaurants()
    // console.log("inputSuggestions:", inputSuggestions)
    // console.log("filteredSuggestions:", filteredSuggestions)

    if (restaurants) {
        restaurants.forEach(restaurant => {
            if (restaurant?.place) {
                // Check if the location already exists in the list
                const index = inputSuggestions.findIndex(item => restaurant.place === item.place)
                // If not, add it to the array
                if (index === -1) {
                    inputSuggestions.push({
                        place: restaurant.place,
                        id: restaurant.id
                    })
                }
            }
        });
    }

    const onSearchFormSubmit = (e) => {
        e.preventDefault()
        // Set the state to the value of the search input.
        // This causes a refetch of the restaurant list in HomePage.
        handleSetCityName(searchedLocation)
        setSearchedLocation("")
        setFilteredSuggestions([])
    }

    const onInputChanged = (e) => {
        setSearchedLocation(e.target.value)
        // If the user has started typing, check if the any of the location
        // names starts with the input.
        // If so, add it to the list of filtered suggestions
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
            {filteredSuggestions.length > 0 && (
                <ul className="border border-top-0 border-primary">
                    {filteredSuggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            // set the input field to the value of the suggestion
                            onClick={() => setSearchedLocation(suggestion.place)}
                        >{suggestion.place}
                        </li>
                    ))}
                </ul>
            )}
            <Button className='me-2' type='search'>Search</Button>
        </Form >
    )
}
export default LocationSearch