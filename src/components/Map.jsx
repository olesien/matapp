import React, { useEffect, useState } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    InfoBox,
} from "@react-google-maps/api";
import Resturant from "./Resturant";
import useStreamRestaurants from "../hooks/useStreamRestaurants";
const options = {
    // zoomControlOptions: {
    //     position: window.google.maps.ControlPosition.RIGHT_CENTER, // ,
    //     // ...otherOptions
    // },
};

const containerStyle = {
    width: "400px",
    height: "400px",
};

const defaultZoom = 10;

const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
};

// const userLocation = { lat: 55.612, lng: 13.011 };

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

function Map({ userLocation }) {
    console.log(userLocation);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAPS_KEY, // ,
        // ...otherOptions
    });
    const [currentLocation, setCurrentLocation] = useState(userLocation);
    const [resturant, setResturant] = useState(null);

    const restaurants = useStreamRestaurants();
    const [currentZoom, setCurrentZoom] = useState(defaultZoom);
    const [map, setMap] = useState();
    const onLoad = React.useCallback(function onLoad(mapInstance) {
        // do something with map Instance
        setMap(mapInstance);
    });

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

    const renderMap = () => {
        // wrapping to a function is useful in case you want to access `window.google`
        // to eg. setup options or create latLng object, it won't be available otherwise
        // feel free to render directly if you don't need that

        return (
            <>
                {" "}
                <Resturant resturant={resturant}></Resturant>
                <GoogleMap
                    options={options}
                    onLoad={onLoad}
                    zoom={defaultZoom}
                    mapContainerStyle={containerStyle}
                    center={userLocation}
                    onZoomChanged={handleZoomChanged}
                    onCenterChanged={handleCenterChanged}
                >
                    {/* {restaurants.map((resturant, key) => {
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
                    })} */}
                </GoogleMap>
            </>
        );
    };

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? renderMap() : <p>Loading..</p>;
}

export default Map;
