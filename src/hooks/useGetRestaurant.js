import useGetDocument from "./useGetDocument";

const useGetRestaurant = (id) => {
    return useGetDocument('restaurants', id)
}

export default useGetRestaurant