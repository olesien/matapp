import Container from "react-bootstrap/Container";
import Map from "../components/Map";
import RestaurantList from "../components/RestaurantList";
import { useState } from "react";
import { useEffect } from "react";

const HomePage = () => {
    const [userLocation, setUserLocation] = useState(false);

    useEffect(() => {
        let center = {
            lat: 33.872,
            lng: -117.214,
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else {
            // code for legacy browsers
            setUserLocation(center);
        }
    }, []);
    console.log(userLocation);
    return (
        <Container className="py-3">
            <h1>Welcome!</h1>
            {userLocation ? <Map userLocation={userLocation} /> : <></>}

            <RestaurantList />
        </Container>
    );
};

export default HomePage;
