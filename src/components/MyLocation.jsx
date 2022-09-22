import React from "react";
import { Circle } from "@react-google-maps/api";

export default function MyLocation({ userLocation }) {
    const onCircleLoad = (circle) => {
        console.log("Circle onLoad circle: ", circle);
    };
    const onCircleUnmount = (circle) => {
        console.log("Circle onUnmount circle: ", circle);
    };
    const circleOptions = {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 200,
        zIndex: 1,
    };
    return (
        <>
            <Circle
                center={userLocation}
                options={circleOptions}
                onLoad={onCircleLoad}
                onUnmount={onCircleUnmount}
            />
        </>
    );
}
