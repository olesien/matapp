import React from "react";
import Container from "react-bootstrap/Container";
import { useTable } from "react-table";
import RenderTable from "../components/RenderTable";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/AuthContext";
import useGetRestaurants from "../hooks/useGetRestaurants";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import RestaurantOverlay from "../components/RestaurantOverlay";

export default function AdminRestaurantsPage() {
    console.log("rendering");
    const { currentUser, initialLoading } = useAuthContext();
    const { data: restaurants, loading } = useGetRestaurants();
    const [restaurant, setRestaurant] = useState(null);
    console.log(restaurants);
    const toggleRestaurant = (id) => {
        console.log(id);
        const restaurant = restaurants.find(
            (restaurant) => restaurant.id == id
        );
        setRestaurant(restaurant);
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
                      approved: restaurant?.approved,
                  })),
        [restaurants]
    );
    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "View",
                accessor: "view",
                Cell: (tableProps) => (
                    <div>
                        <Button
                            className="mt-2"
                            variant="primary"
                            onClick={() => {
                                toggleRestaurant(tableProps.row.original.id);
                            }}
                        >
                            {"View"}
                        </Button>
                    </div>
                ),
            },
            {
                Header: "Approve",
                accessor: "approve",
                Cell: (tableProps) => (
                    <div>
                        <Button
                            className="mt-2"
                            variant="primary"
                            onClick={() => {
                                console.log("approve");
                            }}
                        >
                            {tableProps.row.original.approved
                                ? "Disapprove"
                                : "Approve"}
                        </Button>
                    </div>
                ),
            },
        ],
        [restaurants]
    );
    // if (initialLoading || loading) return <></>;

    const tableInstance = useTable({ columns, data });
    return (
        <Container>
            <h2>Restaurants</h2>
            <RenderTable tableInstance={tableInstance} />
            <RestaurantOverlay
                restaurant={restaurant}
                handleClose={() => setRestaurant(null)}
            />
        </Container>
    );
}
