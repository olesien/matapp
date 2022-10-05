import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { collection, addDoc, GeoPoint } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import GeocodingAPI from "../services/GeocodingAPI";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useState } from "react";

const CreateRestaurantForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { currentUser } = useAuthContext();

    const [image, setImage] = useState(false);
    const handleFileChange = (img) => {
        if (!img.target.files.length) {
            setImage("https://via.placeholder.com/225");
            return;
        }

        setImage(img.target.files[0]);
    };

    const onCreateRestaurant = async (data) => {
        // Get address information from Google Maps API
        const response = await GeocodingAPI.getCoordinates(
            `${data.street_number}%20${data.street_name}%20${data.postcode}%20${data.city}`
        );
        // Handle error

        if (response.status !== "OK") {
            toast.error("Invalid address. Please try again!");
            return;
        } else {
            // Get coordinates
            const lat = response.results[0].geometry.location.lat;
            const lng = response.results[0].geometry.location.lng;

            //Add photo, use date.now to get unix before image name to make it unique!!
            const source = `photos/${currentUser.email}/${
                Date.now() + "-" + data.name
            }`;
            const fileRef = ref(storage, source);

            // upload photo to fileRef
            const uploadResult = await uploadBytes(fileRef, image);

            // get download url to uploaded file
            const photoURL = await getDownloadURL(uploadResult.ref);
            // make firestore doc
            await addDoc(collection(db, "restaurants"), {
                /**
                 * @todo ändra namnet på fälten i databasen
                 */
                // ...data,
                nameLowerCase: data.name.toLowerCase(),
                address: `${data.street_name} ${data.street_number}`,
                category: data.category,
                city: data.city,
                createdBy: currentUser.uid,
                cuisine: data.cuisine,
                description: data.description,
                email: data.email,
                facebook: data.facebook,
                instagram: data.instagram,
                location: new GeoPoint(lat, lng),
                name: data.name,
                offer: data.offer,
                offers: "lunch",
                phone: data.phone,
                photoURL,
                place: data.city,
                position: new GeoPoint(lat, lng),
                postcode: data.postcode,
                type_of_establishment: "restaurant",

                website_url: data.website_url,
                approved: false,
            });

            // url: "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",

            toast.success("Restaurant sent for admin approval");
            reset();
        }
    };

    return (
        <Form onSubmit={handleSubmit(onCreateRestaurant)} noValidate>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    {...register("name", {
                        required: "Provide a name",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters long",
                        },
                    })}
                    placeholder="Burger Queen"
                    type="text"
                />
                {errors.name && (
                    <Form.Text className="text-danger">
                        {errors.name.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Restaurant Picture</Form.Label>
                <Form.Control
                    {...register("image")}
                    type="file"
                    onChange={handleFileChange}
                />
                <Form.Text>
                    {image
                        ? `${image.name} (${Math.round(image.size / 1024)} kB)`
                        : "No photo selected"}
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="street_name">
                <Form.Label>Street name</Form.Label>
                <Form.Control
                    {...register("street_name", {
                        required: "Provide a street name",
                        minLength: {
                            value: 3,
                            message:
                                "Street name must be at least 3 characters long",
                        },
                    })}
                    placeholder="Queen Street"
                    type="text"
                />
                {errors.street_name && (
                    <Form.Text className="text-danger">
                        {errors.street_name.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="street_number">
                <Form.Label>Street number</Form.Label>
                <Form.Control
                    {...register("street_number", {
                        required: "Provide a street number",
                        minLength: {
                            value: 1,
                            message:
                                "Street number must be at least 1 character long",
                        },
                    })}
                    placeholder="4B"
                    type="text"
                />
                {errors.street_number && (
                    <Form.Text className="text-danger">
                        {errors.street_number.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="postcode">
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                    {...register("postcode", {
                        required: "Provide a postcode",
                        pattern: {
                            value: /[0-9]{5}/,
                            message: "Invalid postcode",
                        },
                    })}
                    placeholder="12345"
                    type="text"
                />
                {errors.postcode && (
                    <Form.Text className="text-danger">
                        {errors.postcode.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    {...register("city", {
                        required: "Provide a city",
                        minLength: {
                            value: 3,
                            message: "City must be at least 3 characters long",
                        },
                    })}
                    placeholder="Royaltown"
                    type="text"
                />
                {errors.city && (
                    <Form.Text className="text-danger">
                        {errors.city.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    {...register("description", {
                        required: "Provide a description",
                        minLength: {
                            value: 5,
                            message:
                                "Description must be at least 5 characters long",
                        },
                    })}
                    placeholder="Fine dining for friends and family"
                    type="text"
                />
                {errors.description && (
                    <Form.Text className="text-danger">
                        {errors.description.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="cuisine">
                <Form.Label>Cuisine</Form.Label>
                <Form.Control
                    {...register("cuisine", {
                        required: "Provide a cuisine",
                        minLength: {
                            value: 3,
                            message:
                                "Cuisine must be at least 3 characters long",
                        },
                    })}
                    placeholder="Italian"
                    type="text"
                />
                {errors.cuisine && (
                    <Form.Text className="text-danger">
                        {errors.cuisine.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                    {...register("category", {
                        required: "Select a category",
                    })}
                >
                    <option value="" disabled>
                        Please select an option
                    </option>
                    <option value="restaurant">Restaurant</option>
                    <option value="café">Café</option>
                    <option value="fast_food">Fast Food</option>
                    <option value="food_truck">Food Truck</option>
                </Form.Select>
                {errors.category && (
                    <Form.Text className="text-danger">
                        {errors.category.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="offer">
                <Form.Label>Offer</Form.Label>
                <Form.Select
                    {...register("offer", {
                        required: "Select an offer",
                    })}
                >
                    <option value="" disabled>
                        Please select an option
                    </option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </Form.Select>
                {errors.offer && (
                    <Form.Text className="text-danger">
                        {errors.offer.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    {...register("email", {
                        pattern: {
                            value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/gm,
                            message: "Invalid email",
                        },
                    })}
                    placeholder="info@burgerqueenrestaurant.com"
                    type="email"
                />
                {errors.email && (
                    <Form.Text className="text-danger">
                        {errors.email.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                    {...register("phone", {
                        pattern: {
                            value: /[0-9]{9}/,
                            message: "Invalid phone number",
                        },
                    })}
                    placeholder="070123456"
                    type="tel"
                />
                {errors.phone && (
                    <Form.Text className="text-danger">
                        {errors.phone.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="website_url">
                <Form.Label>Website URL</Form.Label>
                <Form.Control
                    {...register("website_url", {
                        pattern: {
                            value: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                            message: "Invalid URL",
                        },
                    })}
                    placeholder="www.burgerqueenrestaurant.com"
                    type="url"
                />
                {errors.website_url && (
                    <Form.Text className="text-danger">
                        {errors.website_url.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="facebook">
                <Form.Label>Facebook username</Form.Label>
                <Form.Control
                    {...register("facebook")}
                    placeholder="burgerqueenrestaurant"
                    type="text"
                />
                {errors.facebook && (
                    <Form.Text className="text-danger">
                        {errors.facebook.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="instagram">
                <Form.Label>Instagram username</Form.Label>
                <Form.Control
                    {...register("instagram")}
                    placeholder="burgerqueenrestaurant"
                    type="text"
                />
                {errors.instagram && (
                    <Form.Text className="text-danger">
                        {errors.instagram.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Button variant="success" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CreateRestaurantForm;
