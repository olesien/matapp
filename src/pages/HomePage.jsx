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

const HomePage = () => {
    const [userLocation, setUserLocation] = useState({
        lat: 33.872,
        lng: -117.214,
    });
    const [cityName, setCityName] = useState(null)
    console.log(cityName)

    useEffect(() => {
        const getCityName = async () => {
            const res = await GeocodingAPI.getCityName(userLocation)
            if (res) {
                setCityName(res.results[0].address_components[0].long_name)
            }
        }
        getCityName()
    }, [userLocation])

    const [searchParams, setSearchParams] = useSearchParams();

    let tab = searchParams.get("tab");
    if (!tab) {
        tab = "map";
    }

    const [filterOptions, setFilterOptions] = useState({
        option1: searchParams.get("option1"),
        option2: searchParams.get("option2"),
        option3: searchParams.get("option3")
            ? searchParams.get("option3")
            : true,
    });
    const { initialLoading } = useAuthContext();
    const [showFilter, setShowFilter] = useState(false);
    const [sortBy, setSortBy] = useState(false);
    const { data: restaurants } = useGetRestaurants(filterOptions, cityName);
    //const [tab, setTab] = useState("map");

    if (initialLoading) return <></>;

    const setTab = (tab) => {
        const oldParams = {}
        searchParams.forEach((value, key) => {
            oldParams[key] = value
        })
        setSearchParams({ ...oldParams, tab });
    };

    // console.log(filterOptions);

    const handleSetFilterOptions = (options) => {
        const oldParams = {}
        searchParams.forEach((value, key) => {
            oldParams[key] = value
        })
        console.log({ ...oldParams, ...options })
        setFilterOptions(options);
        setSearchParams({ ...oldParams, ...options })
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

    return (
        <Container className="py-3">
            <h1>Welcome!</h1>
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
                        />
                    ) : (
                        <></>
                    )}
                </Tab>
                <Tab eventKey="list" title="Restaurant List">
                    <Button
                        className="mt-2 me-2"
                        onClick={() => {
                            setSortBy(!sortBy);
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
                            handleSetFilterOptions({
                                ...filterOptions,
                                option3: !filterOptions.option3,
                            })
                        }}
                    >
                        {filterOptions.option3 ? "Show all restaurants" : `Show in ${cityName}`}
                    </Button>
                    {showFilter && (
                        <FilterRestaurants
                            filterOptions={filterOptions}
                            handleSetFilterOptions={handleSetFilterOptions}
                        />
                    )}
                    <RestaurantList
                        restaurants={restaurants}
                        userLocation={userLocation}
                        sortByName={sortBy}
                        cityName={cityName}
                        showingByCity={filterOptions.option3 ? true : false}
                    />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default HomePage;