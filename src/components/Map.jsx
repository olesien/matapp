import React, { useEffect } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    StandaloneSearchBox,
    OverlayView,
} from "@react-google-maps/api";
import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import MyLocation from "./MyLocation";
import { useSearchParams } from "react-router-dom";

const libraries = ["places"];

const containerStyle = {
    width: "100%",
    height: "600px",
};

const defaultZoom = 10;

const Map = ({ restaurants, userLocation, handleSetMapReference }) => {
    const [restaurant, setRestaurant] = useState(null);

    const [currentZoom, setCurrentZoom] = useState(defaultZoom);
    // const [zoom, setZoom] = useState(defaultZoom);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
        libraries,
    });
    const [searchParams, setSearchParams] = useSearchParams();

    const [currentLocation, setCurrentLocation] = useState(userLocation);
    const [map, setMap] = React.useState(null);
    const divStyle = {
        background: `white`,
        border: `1px solid #ccc`,
        padding: 15,
    };

    const handleCenterChanged = () => {
        if (map) {
            const newCenter = map.getCenter();
            setCurrentLocation({ lat: newCenter.lat(), lng: newCenter.lng() });
        }
    };
    const handleZoomChanged = () => {
        if (map) {
            const newZoom = map.getZoom();
            setCurrentZoom(newZoom);
        }
    };

    // console.log(currentLocation, userLocation, currentZoom);

    const onLoad = React.useCallback(function callback(map) {
        // const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        map.setZoom(defaultZoom);
        handleSetMapReference(map);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    // Gain access to the searchBox property from Search Box component
    const [searchBox, setSearchBox] = useState(null);
    const onSearchBoxLoad = (ref) => setSearchBox(ref);

    const onClose = () => {
        setRestaurant(null);
    };

    // Pan the map to the new location after search
    const onPlaceChanged = async () => {
        // SearchBox is sometimes null even after having been set in the onSearchBoxLoad function.
        if (searchBox) {
            const res = searchBox.getPlaces();
            await map.panTo({
                lat: res[0].geometry.location.lat(),
                lng: res[0].geometry.location.lng(),
            });
            await map.setZoom(10);
        }
    };

    const defaultOptions = {
        styles: [
            {
                featureType: "all",
                elementType: "labels.text",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            {
                featureType: "poi",
                elementType: "labels.icon",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
        ],
        mapTypeControl: false,
    };

    return isLoaded ? (
        <div className="flex">
            <RestaurantCard
                restaurant={restaurant}
                fromMap={true}
                userLocation={userLocation}
                onClose={onClose}
            ></RestaurantCard>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={userLocation}
                // zoom={defaultZoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onZoomChanged={handleZoomChanged}
                onCenterChanged={handleCenterChanged}
                options={defaultOptions}
            >
                <MyLocation userLocation={userLocation} />
                <StandaloneSearchBox
                    onPlacesChanged={onPlaceChanged}
                    onLoad={onSearchBoxLoad}
                >
                    <input
                        id="map-search-box"
                        type="text"
                        placeholder="Search for location"
                    />
                </StandaloneSearchBox>

                {/* Child components, such as markers, info windows, etc. */}

                {currentZoom > -1 &&
                    restaurants.map((restaurant, key) => {
                        const position = {
                            lat: restaurant.position._lat,
                            lng: restaurant.position._long,
                        };

                        return (
                            <div key={key}>
                                {key == 1 && (
                                    //Loaded
                                    <div>
                                        <MyLocation
                                            userLocation={userLocation}
                                        />
                                    </div>
                                )}
                                <div>
                                    <Marker
                                        // icon={{
                                        //     path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                                        //     fillColor: "yellow",
                                        //     fillOpacity: 0.9,
                                        //     scale: 2,
                                        //     strokeColor: "gold",
                                        //     strokeWeight: 2,
                                        // }}
                                        key={key}
                                        position={position}
                                        onClick={() =>
                                            setRestaurant(restaurant)
                                        }
                                    />
                                    <OverlayView
                                        key="mwl"
                                        position={position}
                                        mapPaneName={
                                            OverlayView.OVERLAY_MOUSE_TARGET
                                        }
                                        getPixelPositionOffset={(x, y) =>
                                            // getPixelPositionOffset(x, y, {
                                            //     x: -30,
                                            //     y: -15,
                                            // })
                                            ({ x: -50, y: 10 })
                                        }
                                    >
                                        <div
                                            style={{
                                                background: `#203254`,
                                                padding: `7px 12px`,
                                                fontSize: "11px",
                                                color: `white`,
                                                borderRadius: "4px",
                                            }}
                                        >
                                            {restaurant.name}
                                        </div>
                                    </OverlayView>
                                </div>
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
