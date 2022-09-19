import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import Resturant from "./Resturant";

const containerStyle = {
    width: "400px",
    height: "400px",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};
const position = { lat: 33.872, lng: -117.214 };

const positions = [
    { lat: 33.772, lng: -117.214, title: "Small Shanghai" },
    { lat: 33.672, lng: -117.214, title: "Japanese samurai special" },
    { lat: 33.572, lng: -117.214, title: "Swedish meatballs" },
];
const Map = () => {
    const [resturant, setResturant] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    });

    const [map, setMap] = React.useState(null);

    const divStyle = {
        background: `white`,
        border: `1px solid #ccc`,
        padding: 15,
    };

    const mapContainerStyle = {
        height: "400px",
        width: "800px",
    };

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
            >
                {/* Child components, such as markers, info windows, etc. */}
                <InfoWindow
                    id="marker-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={2}
                    center={center}
                    position={position}
                >
                    <div style={divStyle}>
                        <h3>InfoWindow</h3>
                    </div>
                    {/* <Marker position={position} /> */}
                </InfoWindow>
                {positions.map((position, key) => (
                    <Marker
                        key={key}
                        position={position}
                        onClick={() => setResturant(position)}
                    />
                ))}

                <></>
            </GoogleMap>
        </div>
    ) : (
        <></>
    );
};

export default React.memo(Map);
