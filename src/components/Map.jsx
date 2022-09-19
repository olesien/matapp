import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import Resturant from "./Resturant";
import useStreamRestaurants from "../hooks/useStreamRestaurants";

const containerStyle = {
    width: "400px",
    height: "400px",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const position = { lat: 33.872, lng: -117.214 };

// const positions = [
//     {
//         lat: 33.772,
//         lng: -117.214,
//         title: "Small Shanghai",
//         url: "https://www.china-briefing.com/news/wp-content/uploads/2019/04/China-Briefing-Shanghai-Industry-Economics-and-Policy.jpg",
//     },
//     {
//         lat: 33.672,
//         lng: -117.214,
//         title: "Japanese samurai special",
//         url: "https://cdn.britannica.com/71/196871-050-B8665B11/Samurai-Armour-Kusakabe-Kimbei.jpg",
//     },
//     {
//         lat: 33.572,
//         lng: -117.214,
//         title: "Swedish meatballs",
//         url: "https://www.recipetineats.com/wp-content/uploads/2017/01/Swedish-Meatballs_2-SQ.jpg",
//     },
// ];
const Map = () => {
    const [resturant, setResturant] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    });
    const restaurants = useStreamRestaurants();
    console.log(restaurants);
    const [map, setMap] = React.useState(null);
    console.log(map);

    const divStyle = {
        background: `white`,
        border: `1px solid #ccc`,
        padding: 15,
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(userLocation); // ADDED
            });
        } else {
            // code for legacy browsers
        }
    };
    useEffect(() => {
        getUserLocation();
    });

    const mapContainerStyle = {};

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <div className="flex">
            <Resturant resturant={resturant}></Resturant>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={100}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onZoomChanged={(test) => console.log(test)}
            >
                {/* Child components, such as markers, info windows, etc. */}

                {restaurants.map((resturant, key) => {
                    const position = {
                        lat: resturant.position._lat,
                        lng: resturant.position._long,
                    };
                    return (
                        <Marker
                            key={key}
                            position={position}
                            onClick={() => setResturant(resturant)}
                            title={resturant.name}
                            label={resturant.name}
                        />
                    );
                })}

                <></>
            </GoogleMap>
        </div>
    ) : (
        <></>
    );
};

export default React.memo(Map);
