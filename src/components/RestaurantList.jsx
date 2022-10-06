import Alert from "react-bootstrap/Alert";
import RestaurantCard from "./RestaurantCard";
import getDistance from "geolib/es/getDistance";
import { useState } from "react";
import { useEffect } from "react";

const RestaurantList = ({
    restaurants,
    userLocation,
    sortByName,
    cityName,
    listingAll,
    mapReference,
    handleSetSearchParams,
    showAlert,
}) => {
    const [sortedRestaurants, setSortedRestaurants] = useState(null);
    const userLocationConverted = {
        latitude: userLocation.lat,
        longitude: userLocation.lng,
    };

    useEffect(() => {
        // This is recalculated whenever sortByName or restaurants changes.
        // Calculate the distance between the user and the restaurants
        let restaurantsWithDistance = restaurants?.map((restaurant) => {
            const distance = getDistance(
                {
                    latitude: restaurant.position._lat,
                    longitude: restaurant.position._long,
                },
                userLocationConverted
            );
            // return a new object with the restaurant + distance
            return { ...restaurant, distance };
        });
        // sort the list by distance if sortByName is falsy
        if (!sortByName) {
            restaurantsWithDistance = restaurantsWithDistance.sort(
                (a, b) => a.distance - b.distance
            );
        }
        // set the newly created array of restaurants to state
        setSortedRestaurants(restaurantsWithDistance);
    }, [restaurants, sortByName]);

    return (
        <div>
            {showAlert && (
                <Alert className="mt-2">Filter options were updated.</Alert>
            )}
            <h3 className="my-4">
                {listingAll
                    ? "Showing all restaurants"
                    : `Showing results for: ${cityName}`}
            </h3>
            <div className="list" data-testid="restaurant-list">
                {sortedRestaurants &&
                    sortedRestaurants.length > 0 &&
                    sortedRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            userLocation={userLocation}
                            mapReference={mapReference}
                            handleSetSearchParams={handleSetSearchParams}
                        />
                    ))}
                {sortedRestaurants && sortedRestaurants.length === 0 && (
                    <p>No results were found</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantList;
