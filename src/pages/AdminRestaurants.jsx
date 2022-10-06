import React from "react";
import Container from "react-bootstrap/Container";
import { useTable } from "react-table";
import RenderSortedTable from "../components/RenderSortedTable";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/AuthContext";
import useStreamRestaurants from "../hooks/useStreamRestaurants";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import RestaurantOverlayAdmin from "../components/RestaurantOverlayAdmin";
import { useSortBy } from "react-table";

export default function AdminRestaurantsPage() {
    console.log("rendering");
    const { currentUser, initialLoading } = useAuthContext();
    const { data: restaurants, loading } = useStreamRestaurants();
    const [restaurant, setRestaurant] = useState(null);
    console.log(restaurants);
    const toggleRestaurant = (id) => {
        console.log(id);
        const restaurant = restaurants.find(
            (restaurant) => restaurant.id == id
        );
        setRestaurant(restaurant);
    };

    const toggleApproved = async (id, approved) => {
        console.log(id);

        const restaurantRef = doc(db, "restaurants", id);

        try {
            await updateDoc(restaurantRef, {
                approved: !approved,
            });
            console.log("Succesfully updated");
        } catch (err) {
            console.log(err);
        }
    };
    // const setAdmin = async (mail, admin) => {
    //     const user = users.find((user) => user.email === mail);
    //     const uid = user.id;
    //     const userRef = doc(db, "users", uid);

    //     try {
    //         await updateDoc(userRef, {
    //             admin: !admin,
    //         });
    //         console.log("Succesfully updated");
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

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
            console.log("rowA: ", rowA);
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
    // if (initialLoading || loading) return <></>;

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
