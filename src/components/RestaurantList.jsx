import RestaurantCard from "./RestaurantCard";

const RestaurantList = ({ restaurants }) => {
    console.log(restaurants);
    return (
        <div>
            <h2>Restaurant list</h2>
            <div className="list">
                {restaurants &&
                    restaurants.length > 0 &&
                    restaurants.map((restaurant) => (
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
