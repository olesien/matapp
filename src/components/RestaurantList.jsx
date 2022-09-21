import Container from "react-bootstrap/Container";
import useStreamRestaurants from "../hooks/useStreamRestaurants";

const RestaurantList = () => {
    const restaurants = useStreamRestaurants();
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
