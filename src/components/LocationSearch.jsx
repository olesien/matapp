import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useGetRestaurants from "../hooks/useGetRestaurants";

const LocationSearch = ({ handleSetCityName }) => {
    const [searchedLocation, setSearchedLocation] = useState("")
    const inputSuggestions = []
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const { data: restaurants } = useGetRestaurants()
    const [inputIsFocused, setInputIsFocused] = useState(false)
    const onInputFocus = () => setInputIsFocused(true)
    const onInputBlur = () => {
        setTimeout(() => {
            setInputIsFocused(false)
        }, 100)
    }

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
                suggestion.place.toLowerCase().startsWith(e.target.value.toLowerCase())
            ))
            : []
        console.log(filtered)
        setFilteredSuggestions(filtered)
    }

    return (
        <Form autoComplete="off" name="restaurant-filter-form" onSubmit={onSearchFormSubmit} >
            <div className="my-2">
                <Form.Label htmlFor='city-search'>Search for a city/location</Form.Label>
                <Form.Control
                    name='city-search'
                    value={searchedLocation}
                    onChange={(e) => onInputChanged(e)}
                    id='city-search'
                    placeholder="Search for a city/location"
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    type="search"
                />
            </div>
            {/* Suggestions to show when the user has typed in the input field (and it's focused) */}
            {filteredSuggestions.length > 0 && inputIsFocused && (
                <ul className="border border-top-0 border-primary">
                    {filteredSuggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            // set the input field to the value of the suggestion
                            onClick={() => setSearchedLocation(suggestion.place)}
                        >
                            {suggestion.place}
                        </li>
                    ))}
                </ul>
            )}
            {/* Suggestions to show when the user hasn't typed in the input field (and it's focused) */}
            {inputSuggestions.length > 0 && filteredSuggestions <= 0 && inputIsFocused && (
                <ul className="border border-top-0 border-primary">
                    {inputSuggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            // set the input field to the value of the suggestion
                            onClick={() => setSearchedLocation(suggestion.place)}
                        >
                            {suggestion.place}
                        </li>
                    ))}
                </ul>
            )}
            <Button className='me-2' type='search'>Search</Button>
        </Form >
    )
}
export default LocationSearch