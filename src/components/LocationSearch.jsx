import { useEffect } from "react";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useGetRestaurants from "../hooks/useGetRestaurants";

const LocationSearch = ({ resetCityName, handleSetSearchParams }) => {
    const [searchedLocation, setSearchedLocation] = useState("")
    const [inputSuggestions, setInputSuggestions] = useState([])
    const [locationNotFound, setLocationNotFound] = useState(false)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const { data: restaurants } = useGetRestaurants()
    const [inputIsFocused, setInputIsFocused] = useState(false)
    const onInputFocus = () => setInputIsFocused(true)
    const onInputBlur = () => {
        //Tried my best, still failed
        setTimeout(() => {
            setInputIsFocused(false);
        }, 300);
    };

    useEffect(() => {
        if (restaurants) {
            const suggestions = [];
            restaurants.forEach((restaurant) => {
                if (restaurant?.place) {
                    // Check if the location already exists in the list
                    const index = suggestions.findIndex(
                        (item) => restaurant.place === item.place
                    );
                    // If not, add it to the array
                    if (index === -1) {
                        suggestions.push({
                            place: restaurant.place,
                            id: restaurant.id,
                        });
                    }
                }
            });
            suggestions.sort((a, b) => (a.place > b.place ? 1 : -1));
            setInputSuggestions(suggestions);
        }
    }, [restaurants]);

    const onSearchFormSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLocationNotFound(false);
        // Set the state to the value of the search input.
        // This causes a refetch of the restaurant list in HomePage.
        if (
            !restaurants.find(
                (restaurant) =>
                    restaurant.place.toLowerCase() ===
                    searchedLocation.toLowerCase()
            )
        ) {
            setSearchedLocation("");
            setFilteredSuggestions([]);
            setLocationNotFound(true);
            return;
        }
        // Reformat the supplied text to that the firebase fetch doesn't fail
        // City name should be saved capitalised in the database
        const reformatedLocation =
            searchedLocation.charAt(0).toUpperCase() +
            searchedLocation.slice(1);
        handleSetSearchParams({ city: reformatedLocation, listAll: false });

        setSearchedLocation("");
        setFilteredSuggestions([]);
    };

    const onInputChanged = (e) => {
        setLocationNotFound(false);
        setSearchedLocation(e.target.value);
        // If the user has started typing, check if the any of the location
        // names starts with the input.
        // If so, add it to the list of filtered suggestions
        const filtered =
            e.target.value !== ""
                ? inputSuggestions.filter((suggestion) =>
                      suggestion.place
                          .toLowerCase()
                          .startsWith(e.target.value.toLowerCase())
                  )
                : [];
        // Using slice on the array so that only the 10 closest results are shown
        const bestResults = filtered.slice(0, 10);
        setFilteredSuggestions(bestResults);
    };

    const changeSearch = (newPlace) => {
        setSearchedLocation(newPlace);
    };

    return (
        <>
            <Form
                className="d-flex align-items-center flex-wrap"
                autoComplete="off"
                name="restaurant-filter-form"
                onSubmit={onSearchFormSubmit}
            >
                <div className="my-2 flex-grow-1 position-relative">
                    <Form.Control
                        className=""
                        id="city-search"
                        name="city-search"
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
                                    id="search-option"
                                    // set the input field to the value of the suggestion
                                    onClick={() =>
                                        changeSearch(suggestion.place)
                                    }
                                >
                                    {suggestion.place}
                                </li>
                            ))}
                        </ul>
                    )}
                    {/* Suggestions to show when the user hasn't typed in the input field (and it's focused) */}
                    {inputSuggestions.length > 0 &&
                        filteredSuggestions <= 0 &&
                        searchedLocation === "" &&
                        inputIsFocused && (
                            <ul className="input-suggestions">
                                {inputSuggestions.map((suggestion) => (
                                    <li
                                        key={suggestion.id}
                                        id="search-option"
                                        onClick={() =>
                                            changeSearch(suggestion.place)
                                        }
                                    >
                                        <span>{suggestion.place}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                </div>
                <Button className="ms-2" type="search">
                    Search
                </Button>
            </Form>
            {/* reset the city name/location by recalculating the value using the user's coordinates */}
            <Button onClick={resetCityName}>Reset location</Button>
            {locationNotFound && (
                <Alert className="mt-2" variant="warning">
                    No restaurants for that location was found in our database.
                </Alert>
            )}
        </>
    );
};
export default LocationSearch;
