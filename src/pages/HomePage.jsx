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
import GeocodingAPI from "../services/GeocodingAPI"
import LocationSearch from "../components/LocationSearch";
import RestaurantOverlay from "../components/RestaurantOverlay";

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [userLocation, setUserLocation] = useState({
        lat: 33.872,
        lng: -117.214,
    });
    const [cityName, setCityName] = useState(null)
    const [initialCityName, setInitialCityName] = useState(searchParams.get("city")
        ? searchParams.get('city')
        : null
    )
    // console.log(cityName)
    const [mapReference, setMapReference] = useState(null)

    const handleSetCityName = (name) => {
        setCityName(name)
    }

    const handleSetMapReference = (map) => {
        setMapReference(map)
    }

    const handleGetCityName = async () => {
        const res = await GeocodingAPI.getCityName(userLocation);
        if (res) {
            // setCityName(res.results[0].address_components[0].long_name);
            handleSetSearchParams({ city: res.results[0].address_components[0].long_name })
        }
    };

    useEffect(() => {
        console.log("Recalculating city name from userLocation");
        if (initialCityName === null) {
            handleGetCityName();
        }
    }, [userLocation]);

    let tab = searchParams.get("tab");
    if (!tab) {
        tab = "map";
    }

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
    // const [sortBy, setSortBy] = useState(false);
    const sortBy = searchParams.get("sortByName")
        ? searchParams.get("sortByName") === "true"
            ? true
            : false
        : false;

    const { data: restaurants } = useGetRestaurants(filterOptions, cityName);

    useEffect(() => {
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

    //const [tab, setTab] = useState("map");

    if (initialLoading) return <></>;

    const setTab = (tab) => {
        const oldParams = {};
        searchParams.forEach((value, key) => {
            oldParams[key] = value;
        });
        setSearchParams({ ...oldParams, tab });
    };
    // console.log(filterOptions);

    const handleSetSearchParams = (options) => {
        const oldParams = {};
        searchParams.forEach((value, key) => {
            oldParams[key] = value;
        });
        // setFilterOptions(options);
        setSearchParams({ ...oldParams, ...options });
    };

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
                console.log(userLocation);
                center = userLocation;
                console.log(center);
                setUserLocation(center);
            });
        } else {
            // code for legacy browsers
            setUserLocation(center);
        }
    }, []);

    const restaurantIdUrlParam = searchParams.get("id")

    useEffect(() => {
        if (restaurantIdUrlParam) {
            const restaurant = restaurants.find(restaurant => restaurant.id === restaurantIdUrlParam)

            if (restaurant) {
                mapReference.panTo({
                    lat: restaurant.position.latitude,
                    lng: restaurant.position.longitude,
                })
            }
        }
    }, [restaurantIdUrlParam])


    useEffect(() => {
        const city = searchParams.get("city")
        if (city) {
            setCityName(city)
        }
    }, [searchParams])

    return (
        <>
            <Container className="py-3">
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
                                : "Show all"}
                        </Button>

                        <div className="location-search-wrapper">
                            <LocationSearch
                                handleSetCityName={handleSetCityName}
                                handleGetCityName={handleGetCityName}
                                handleSetSearchParams={handleSetSearchParams}
                            />
                        </div>

                        {showFilter && (
                            <FilterRestaurants
                                handleSetSearchParams={handleSetSearchParams}
                                filterOptions={filterOptions}
                                searchParams={searchParams}
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
                        />
                    </Tab>
                </Tabs>
            </Container>
            <RestaurantOverlay />
        </>
    );
};

export default HomePage;
