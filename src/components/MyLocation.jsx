import React from "react";
import { Circle } from "@react-google-maps/api";

export default function MyLocation({ userLocation }) {
    const onCircleLoad = (circle) => {
    };
    const onCircleUnmount = (circle) => {
    };
    const circleOptions = {
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
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
