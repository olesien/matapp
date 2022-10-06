import React from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
const libraries = ["places"];
const containerStyle = {
    width: "100%",
    height: "600px",
};

const defaultZoom = 10;

//Custom styling and removing map type selection as it goes below searchbar in mobile
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

const Map = ({
    restaurants,
    userLocation,
    handleSetMapReference,
    restaurantLoading,
}) => {
    const [restaurant, setRestaurant] = useState(null);
    const [currentZoom, setCurrentZoom] = useState(defaultZoom);
    const [map, setMap] = React.useState(null);
    const [searchBox, setSearchBox] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
        libraries,
    });

    //Current zoom has changed
    const handleZoomChanged = () => {
        if (map) {
            const newZoom = map.getZoom();
            setCurrentZoom(newZoom);
        }
    };

    //Map has loaded
    const onLoad = React.useCallback(function callback(map) {
        map.setZoom(defaultZoom);
        handleSetMapReference(map);
        setMap(map);
    }, []);

    //Unmount map
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    // Gain access to the searchBox property from Search Box component
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

    //Has loaded, load the map and card
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
                onLoad={onLoad}
                onUnmount={onUnmount}
                onZoomChanged={handleZoomChanged}
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
                {!restaurantLoading ? (
                    <div>
                        <OverlayView
                            key="mwl"
                            position={userLocation}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            getPixelPositionOffset={(x, y) => ({
                                x: 0,
                                y: 0,
                            })}
                        >
                            <FontAwesomeIcon icon={faPerson} />
                        </OverlayView>
                        <MyLocation userLocation={userLocation} />
                        {currentZoom > -1 &&
                            restaurants.map((restaurant, key) => {
                                const position = {
                                    lat: restaurant.position._lat,
                                    lng: restaurant.position._long,
                                };

                                return (
                                    <div key={key}>
                                        <div>
                                            <Marker
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
                                                getPixelPositionOffset={(
                                                    x,
                                                    y
                                                ) => ({
                                                    x: -50,
                                                    y: 10,
                                                })}
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
                    </div>
                ) : (
                    <></>
                )}

                <></>
            </GoogleMap>
        </div>
    ) : (
        <></>
    );
};

export default React.memo(Map);
