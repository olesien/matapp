import Resturant from "./Resturant";

const RestaurantList = ({ restaurants }) => {
    console.log(restaurants);
    return (
        <div>
            <h2>Restaurant list</h2>
            {restaurants &&
                restaurants.length > 0 &&
                restaurants.map((restaurant) => (
                    <Resturant key={restaurant.id} restaurant={restaurant} />
                ))}
        </div>
    );
};

export default RestaurantList;
