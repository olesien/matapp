import RestaurantCard from "./RestaurantCard";
import getDistance from "geolib/es/getDistance";
import { useState } from "react";
import { useEffect } from "react";

const RestaurantList = ({
    restaurants,
    userLocation,
    sortByName,
    cityName,
    showingByCity
}) => {
    const [sortedRestaurants, setSortedRestaurants] = useState(null);
    // console.log(restaurants);
    const userLocationConverted = {
        latitude: userLocation.lat,
        longitude: userLocation.lng,
    };

    useEffect(() => {
        let restaurantsWithDistance = restaurants?.map((restaurant) => {
            const distance = getDistance(
                {
                    latitude: restaurant.position._lat,
                    longitude: restaurant.position._long,
                },
                userLocationConverted
            );
            return { ...restaurant, distance };
        });

        if (!sortByName) {
            restaurantsWithDistance = restaurantsWithDistance.sort(
                (a, b) => a.distance - b.distance
            );
        }
        setSortedRestaurants(restaurantsWithDistance)
    }, [restaurants, sortByName]);

    return (
        <div>
            <h2>Restaurant list</h2>
            <h3>{showingByCity ? `Showing results for: ${cityName}` : "Showing all restaurants:"}</h3>
            <div className="list">
                {sortedRestaurants &&
                    sortedRestaurants.length > 0 &&
                    sortedRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))
                }
                {sortedRestaurants && sortedRestaurants.length === 0 && (
                    <p>No restaurants were found</p>
                )}

            </div>
        </div>
    );
};

export default RestaurantList;
