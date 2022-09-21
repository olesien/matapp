import Container from "react-bootstrap/Container";
import Map from "../components/Map";
import RestaurantList from "../components/RestaurantList";
import { useState } from "react";
import { useEffect } from "react";
import FilterRestaurants from "../components/FilterRestaurants";
import Button from "react-bootstrap/Button";

const HomePage = () => {
    const [userLocation, setUserLocation] = useState(false);
    const [showFilter, setShowFilter] = useState(false)
    const [filterOptions, setFilterOptions] = useState(null)

    console.log(filterOptions)

    const handleSetFilterOptions = (options) => {
        setFilterOptions(options)
    }

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
            {userLocation ? <Map userLocation={userLocation} /> : <></>}

            <Button className="mt-2" onClick={() => { setShowFilter(!showFilter) }}>Filter</Button>
            {showFilter && (<FilterRestaurants handleSetFilterOptions={handleSetFilterOptions} />)}
            <RestaurantList filterOptions={filterOptions} />
        </Container>
    );
};

export default HomePage;
