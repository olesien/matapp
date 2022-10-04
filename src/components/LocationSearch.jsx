import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useGetRestaurants from "../hooks/useGetRestaurants";

const LocationSearch = ({ handleSetCityName, handleGetCityName }) => {
    const [searchedLocation, setSearchedLocation] = useState("")
    const inputSuggestions = []
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const { data: restaurants } = useGetRestaurants()
    const [inputIsFocused, setInputIsFocused] = useState(false)
    const onInputFocus = () => setInputIsFocused(true)
    const onInputBlur = () => {
        setTimeout(() => {
            // Add a delay so that the list doesn't dissapear 
            // when you try to click on a suggestion.
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
        // // Only show the 10 closest suggestions somehow
        // const bestResults = filtered.slice(-10) 
        // setFilteredSuggestions(bestResults)
    }

    return (
        <>
            <Form
                className="d-flex align-items-center flex-wrap"
                autoComplete="off" name="restaurant-filter-form"
                onSubmit={onSearchFormSubmit}
            >
                <div className="my-2 flex-grow-1 position-relative">
                    {/* <Form.Label htmlFor='city-search'>Search for a location</Form.Label> */}
                    <Form.Control
                        className=""
                        id='city-search'
                        name='city-search'
                        onChange={(e) => onInputChanged(e)}
                        onBlur={onInputBlur}
                        onFocus={onInputFocus}
                        placeholder="Search for a city/location"
                        type="search"
                        value={searchedLocation}
                    />

                    {/* Suggestions to show when the user has typed in the input field (and it's focused) */}
                    {filteredSuggestions.length > 0 && inputIsFocused && (
                        <ul className="input-suggestions border border-top-0 border-primary">
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
                        <ul className="input-suggestions">
                            {inputSuggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    // set the input field to the value of the suggestion
                                    onClick={() => setSearchedLocation(suggestion.place)}
                                >
                                    <span>{suggestion.place}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Button className='ms-2' type='search'>Search</Button>
            </Form >
            {/* reset the city name/location by recalculating the value using the user's coordinates */}
            <Button onClick={handleGetCityName}>Reset location</Button>
        </>
    )
}
export default LocationSearch