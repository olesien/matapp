import React from "react";
import Carousel from "react-bootstrap/Carousel";
import useGetRestaurantImages from "../hooks/useGetRestaurantImages";

export default function RestaurantImages({ id }) {
    const { data: images, loading } = useGetRestaurantImages(id);
    console.log(images);
    if (loading || images.length < 1) return <></>;
    console.log("running");
    return (
        <div className=" d-block w-100">
            User submitted images
            <Carousel slide={false}>
                {images.map((image, key) => (
                    <Carousel.Item key={key}>
                        <img
                            className="d-block"
                            style={{ width: "100%", height: 250 }}
                            src={image.imageurl}
                            alt={image.title}
                        />
                        <Carousel.Caption>
                            <p>{image.title}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
