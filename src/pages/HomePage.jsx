import Container from "react-bootstrap/Container";
import Map from "../components/Map";
import RestaurantList from "../components/RestaurantList";
import { useState } from "react";
import { useEffect } from "react";
import FilterRestaurants from "../components/FilterRestaurants";
import Button from "react-bootstrap/Button";
import useGetRestaurants from "../hooks/useGetRestaurants";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import GeocodingAPI from "../services/GeocodingAPI";
import LocationSearch from "../components/LocationSearch";
import RestaurantOverlay from "../components/RestaurantOverlay";

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [userLocation, setUserLocation] = useState({
        lat: 33.872,
        lng: -117.214,
    });

    // saving city name to state
    const [cityName, setCityName] = useState(null);

    // saving city name that is initially fetched
    const [initialCityName, setInitialCityName] = useState(
        searchParams.get("city") ? searchParams.get("city") : null
    );

    // Reference to the map object created in the Map component.
    // This way we can access functions to change the map.
    const [mapReference, setMapReference] = useState(null);

    // Function to set the reference.
    const handleSetMapReference = (map) => {
        setMapReference(map);
    };

    let retrievedLocation = searchParams.get("retrievedLocation");

    // Get city name via currentLocation.
    const handleGetCityName = async (userLocation) => {
        console.log(retrievedLocation);
        if (retrievedLocation) return;
        console.log("got this far");
        const res = await GeocodingAPI.getCityName(userLocation);
        if (res) {
            handleSetSearchParams({
                city: res.results[0].address_components[0].long_name,
                retrievedLocation: true,
            });
        }
    };

    // reset city name to that of your current location.
    const resetCityName = async () => {
        const res = await GeocodingAPI.getCityName(userLocation);
        if (res) {
            handleSetSearchParams({
                city: res.results[0].address_components[0].long_name,
            });
        }
    }

    // Recalculating city name from userLocation"
    useEffect(() => {
        console.log("Recalculating city name from userLocation");
        if (initialCityName === null) {
            console.log("getting it");
            handleGetCityName(userLocation);
        }
    }, [userLocation, initialCityName]);

    // Check which tab should load
    let tab = searchParams.get("tab");
    if (!tab) {
        tab = "map";
    }

    // Initially get filter options from search params.
    const [filterOptions, setFilterOptions] = useState({
        type: searchParams.get("type"),
        offering: searchParams.get("offering"),
        listAll: searchParams.get("listAll")
            ? searchParams.get("listAll") === "false"
                ? false
                : true
            : false,
    });

    const { initialLoading } = useAuthContext();

    const [showFilter, setShowFilter] = useState(false);

    // getting sortBy from url params. 
    // Used to query the database for restaurants.
    const sortBy = searchParams.get("sortByName")
        ? searchParams.get("sortByName") === "true"
            ? true
            : false
        : false;

    // Get the restaurants data
    const { data: restaurants, loading: restaurantLoading } = useGetRestaurants(
        filterOptions,
        cityName
    );

    useEffect(() => {
        // set filter options to search params
        setFilterOptions({
            type: searchParams.get("type") ? searchParams.get("type") : "",
            offering: searchParams.get("offering")
                ? searchParams.get("offering")
                : "",
            listAll: searchParams.get("listAll")
                ? searchParams.get("listAll") === "false"
                    ? false
                    : true
                : false,
        });
    }, [searchParams]);

    if (initialLoading) return <></>;

    const setTab = (tab) => {
        const oldParams = {};
        searchParams.forEach((value, key) => {
            oldParams[key] = value;
        });
        setSearchParams({ ...oldParams, tab });
    };

    // set new search params while saving old values
    const handleSetSearchParams = (options) => {
        const oldParams = {};
        searchParams.forEach((value, key) => {
            oldParams[key] = value;
        });
        setSearchParams({ ...oldParams, ...options });
    };

    // Setting the user's coordinates to state
    useEffect(() => {
        let center = {
            lat: 33.872,
            lng: -117.214,
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                center = userLocation;
                setUserLocation(center);
                handleGetCityName(center);
            });
        } else {
            // code for legacy browsers
            setUserLocation(center);
        }
    }, []);

    const restaurantIdUrlParam = searchParams.get("id");

    useEffect(() => {
        // if restaurant id param changes, pan the map to the restaurant
        if (restaurantIdUrlParam) {
            const restaurant = restaurants.find(
                (restaurant) => restaurant.id === restaurantIdUrlParam
            );

            if (restaurant) {
                mapReference.panTo({
                    lat: restaurant.position.latitude,
                    lng: restaurant.position.longitude,
                });
            }
        }
    }, [restaurantIdUrlParam]);

    useEffect(() => {
        const city = searchParams.get("city");
        // if city exists in the params, set cityName to it.
        if (city) {
            setCityName(city);
        }
    }, [searchParams]);

    useEffect(() => {
        // Setting city search param if there is none and cityName is truthy.
        // Helps to preserve the city search param if the user navigates to the home page via
        // the navbar brand link (and the home page has already been mounted).
        if (cityName && !searchParams.get("city")) {
            console.log(
                "Setting city search param if there is none and cityName is truthy"
            );
            handleSetSearchParams({ city: cityName });
        }
    }, [searchParams]);

    useEffect(() => {
        // Panning the map when cityName changes
        if (mapReference) {
            console.log("Panning when cityName changes");
            GeocodingAPI.getCoordinates(cityName).then((res) => {
                mapReference.panTo({
                    lat: res.results[0].geometry.location.lat,
                    lng: res.results[0].geometry.location.lng,
                });
            });
        }
    }, [cityName]);

    const [showAlert, setShowAlert] = useState(false);

    // function to toggle alert. Used in the filter component
    const handleSetShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 4000);
    };

    return (
        <>
            <Container className="py-3">
                <div className="location-search-wrapper mb-2">
                    <LocationSearch
                        resetCityName={resetCityName}
                        handleSetSearchParams={handleSetSearchParams}
                    />
                </div>

                <Tabs
                    activeKey={tab}
                    onSelect={(tab) => setTab(tab)}
                    id="tabs"
                    className="mb-3"
                >
                    <Tab eventKey="map" title="Restaurant Map">
                        {userLocation ? (
                            <Map
                                restaurants={restaurants}
                                restaurantLoading={restaurantLoading}
                                userLocation={userLocation}
                                handleSetMapReference={handleSetMapReference}
                            />
                        ) : (
                            <></>
                        )}
                    </Tab>
                    <Tab eventKey="list" title="Restaurant List">
                        <Button
                            className="mt-2 me-2"
                            onClick={() => {
                                handleSetSearchParams({
                                    sortByName: !sortBy,
                                });
                            }}
                        >
                            {sortBy ? "Sort by distance" : "Sort by name"}
                        </Button>
                        <Button
                            className="mt-2"
                            onClick={() => {
                                setShowFilter(!showFilter);
                            }}
                        >
                            Filter
                        </Button>
                        <Button
                            className="mt-2 ms-2"
                            onClick={() => {
                                handleSetSearchParams({
                                    listAll: searchParams.get("listAll")
                                        ? searchParams.get("listAll") ===
                                            "false"
                                            ? true
                                            : false
                                        : true,
                                });
                            }}
                        >
                            {filterOptions.listAll
                                ? `Show in ${cityName}`
                                : "Show all cities"}
                        </Button>

                        {showFilter && (
                            <FilterRestaurants
                                handleSetSearchParams={handleSetSearchParams}
                                filterOptions={filterOptions}
                                searchParams={searchParams}
                                handleSetShowAlert={handleSetShowAlert}
                            />
                        )}
                        <RestaurantList
                            restaurants={restaurants}
                            userLocation={userLocation}
                            sortByName={sortBy}
                            cityName={cityName}
                            listingAll={filterOptions.listAll}
                            mapReference={mapReference}
                            handleSetSearchParams={handleSetSearchParams}
                            showAlert={showAlert}
                        />
                    </Tab>
                </Tabs>
            </Container>
            <RestaurantOverlay />
        </>
    );
};

export default HomePage;
