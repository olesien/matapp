import RestaurantCard from "./RestaurantCard";
import getDistance from "geolib/es/getDistance";

const RestaurantList = ({
    restaurants,
    userLocation,
    sortbyDistance = true,
}) => {
    // console.log(restaurants);
    const userLocationConverted = {
        latitude: userLocation.lat,
        longitude: userLocation.lng,
    };
    let sortedRestaurants = restaurants?.map((restaurant) => {
        const distance = getDistance(
            {
                latitude: restaurant.position._lat,
                longitude: restaurant.position._long,
            },
            userLocationConverted
        );
        return { ...restaurant, distance };
    });

    if (sortbyDistance) {
        sortedRestaurants = sortedRestaurants.sort(
            (a, b) => a.distance - b.distance
        );
    }
    return (
        <div>
            <h2>Restaurant list</h2>
            <div className="list">
                {sortedRestaurants &&
                    sortedRestaurants.length > 0 &&
                    sortedRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}
            </div>
        </div>
    );
};

export default RestaurantList;
