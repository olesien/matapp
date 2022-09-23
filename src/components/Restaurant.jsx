import React from "react";

export default function Resturant({ restaurant }) {
    return (
        <div>
            <h4>{restaurant.name}</h4>
            <p>{restaurant.description}</p>
        </div>
    );
}
