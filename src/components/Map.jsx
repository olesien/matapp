import React, { useEffect } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    InfoWindow,
    InfoBox,
} from "@react-google-maps/api";
import { useState } from "react";
import Resturant from "./Resturant";
import useStreamRestaurants from "../hooks/useStreamRestaurants";

const containerStyle = {
    width: "400px",
    height: "400px",
};

const defaultZoom = 100;
//const position = { lat: 33.872, lng: -117.214 };

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

const userLocation = { lat: 55.612, lng: 13.011 };
//const userLocation = { lat: 33.872, lng: -117.214 };
//const userLocation = { lat: 55.872, lng: -13.214 };
const Map = () => {
    console.log(userLocation);
    const [resturant, setResturant] = useState(null);

    const [currentZoom, setCurrentZoom] = useState(defaultZoom);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    });

    const [currentLocation, setCurrentLocation] = useState(userLocation);
    //const [center, setCenter] = useState(userLocation);
    const restaurants = useStreamRestaurants();
    //console.log(restaurants);
    const [map, setMap] = React.useState(null);
    //console.log(map);

    const divStyle = {
        background: `white`,
        border: `1px solid #ccc`,
        padding: 15,
    };

    const mapContainerStyle = {};

    const handleCenterChanged = () => {
        if (map) {
            const newCenter = map.getCenter();
            //console.log(newCenter.lat(), newCenter.lng());
            setCurrentLocation({ lat: newCenter.lat(), lng: newCenter.lng() });
        }
    };
    const handleZoomChanged = () => {
        if (map) {
            const newZoom = map.getZoom();
            //console.log(newZoom);
            setCurrentZoom(newZoom);
        }
    };

    console.log(currentLocation, userLocation, currentZoom);

    const onLoad = React.useCallback(async function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(userLocation);
        await map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);
    const options = { closeBoxURL: "", enableEventPropagation: true };
    return isLoaded ? (
        <div className="flex">
            <Resturant resturant={resturant}></Resturant>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={userLocation}
                zoom={defaultZoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onZoomChanged={handleZoomChanged}
                onCenterChanged={handleCenterChanged}
            >
                {/* Child components, such as markers, info windows, etc. */}

                {restaurants.map((resturant, key) => {
                    const position = {
                        lat: resturant.position._lat,
                        lng: resturant.position._long,
                    };

                    return (
                        <div key={key}>
                            <Marker
                                key={key}
                                position={position}
                                onClick={() => setResturant(resturant)}
                                title={resturant.name}
                                // label={resturant.name}
                            />
                            <InfoBox
                                options={options}
                                onClick={() => setResturant(resturant)}
                                position={position}
                            >
                                <div
                                    style={{
                                        opacity: 1,
                                        marginBottom: 10,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 16,
                                            fontColor: `#08233B`,
                                        }}
                                    >
                                        {resturant.name}
                                    </div>
                                </div>
                            </InfoBox>
                        </div>
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
