import useStreamRestaurants from "../hooks/useStreamRestaurants";

const RestaurantList = ({ filterOptions }) => {
    const restaurants = useStreamRestaurants(filterOptions);
    console.log(restaurants);
    return (
        <div>
            <h2>Restaurant list</h2>
            {restaurants &&
                restaurants.length > 0 &&
                restaurants.map((restaurant) => (
                    <div key={restaurant.id}>
                        <h4>{restaurant.name}</h4>
                        <p>{restaurant.description}</p>
                    </div>
                ))}
        </div>
    );
};

export default RestaurantList;
