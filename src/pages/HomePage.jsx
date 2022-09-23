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

const HomePage = () => {
    const [userLocation, setUserLocation] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [sortBy, setSortBy] = useState(false);
    const [filterOptions, setFilterOptions] = useState(null);
    const restaurants = useGetRestaurants(filterOptions);

    console.log(filterOptions);

    const handleSetFilterOptions = (options) => {
        setFilterOptions(options);
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
            <Tabs defaultActiveKey="map" id="tabs" className="mb-3">
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
                        className="mt-2"
                        onClick={() => {
                            setSortBy(!sortBy);
                        }}
                    >
                        Sort By Name
                    </Button>
                    <Button
                        className="mt-2"
                        onClick={() => {
                            setShowFilter(!showFilter);
                        }}
                    >
                        Filter
                    </Button>
                    {showFilter && (
                        <FilterRestaurants
                            handleSetFilterOptions={handleSetFilterOptions}
                        />
                    )}
                    <RestaurantList restaurants={restaurants} />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default HomePage;
