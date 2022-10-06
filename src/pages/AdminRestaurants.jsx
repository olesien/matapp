import React from "react";
import Container from "react-bootstrap/Container";
import { useTable } from "react-table";
import RenderSortedTable from "../components/RenderSortedTable";
import Button from "react-bootstrap/Button";
import useStreamRestaurants from "../hooks/useStreamRestaurants";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import RestaurantOverlayAdmin from "../components/RestaurantOverlayAdmin";
import { useSortBy } from "react-table";
import { toast } from "react-toastify";

export default function AdminRestaurantsPage() {
    const { data: restaurants, loading } = useStreamRestaurants();
    const [restaurant, setRestaurant] = useState(null);
    const toggleRestaurant = (id) => {
        const restaurant = restaurants.find(
            (restaurant) => restaurant.id == id
        );
        setRestaurant(restaurant);
    };

    const toggleApproved = async (id, approved) => {

        const restaurantRef = doc(db, "restaurants", id);

        try {
            await updateDoc(restaurantRef, {
                approved: !approved,
            });
            toast.success('Successfully approved restaurant!')
        } catch (err) {
            toast.error(err.message)
        }
    };

    const data = React.useMemo(
        () =>
            loading
                ? []
                : restaurants.map((restaurant) => ({
                      id: restaurant.id,
                      name: restaurant.name,
                      street_address: restaurant?.address,
                      city: restaurant?.place,
                      category: restaurant?.type_of_establishment,
                      approved: restaurant?.approved,
                  })),
        [restaurants]
    );

    const actionSortByFunction = React.useMemo(() => {
        return (rowA, rowB, columnId, desc) => {
            //Sort by approve / disapprove
            if (rowA.original.approved && !rowB.original.approved) return 1;
            if (!rowA.original.approved && rowB.original.approved) return -1;
            return 0;
        };
    }, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Street Address",
                accessor: "street_address",
            },
            {
                Header: "City",
                accessor: "city",
            },
            {
                Header: "Category",
                accessor: "category",
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (tableProps) => (
                    <div>
                        <Button
                            className="mt-2"
                            style={{ marginRight: 10 }}
                            variant="primary"
                            onClick={() => {
                                toggleRestaurant(tableProps.row.original.id);
                            }}
                        >
                            {"View"}
                        </Button>
                        <Button
                            className="mt-2"
                            variant={
                                tableProps.row.original.approved
                                    ? "danger"
                                    : "success"
                            }
                            onClick={() => {
                                toggleApproved(
                                    tableProps.row.original.id,
                                    tableProps.row.original.approved
                                );
                            }}
                        >
                            {tableProps.row.original.approved
                                ? "Disapprove"
                                : "Approve"}
                        </Button>
                    </div>
                ),
                sortType: actionSortByFunction,
            },
        ],
        [restaurants, actionSortByFunction]
    );

    const tableInstance = useTable({ columns, data }, useSortBy);
    return (
        <Container>
            <h2>Restaurants</h2>
            <RenderSortedTable tableInstance={tableInstance} />
            <RestaurantOverlayAdmin
                restaurant={restaurant}
                handleClose={() => setRestaurant(null)}
            />
        </Container>
    );
}
