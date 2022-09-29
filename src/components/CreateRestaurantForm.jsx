import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { collection, addDoc, GeoPoint } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const CreateRestaurantForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { currentUser } = useAuthContext();

    const onCreateRestaurant = async (data) => {
        // make firestore doc
        await addDoc(collection(db, "restaurants"), {
            address: `${data.streetName} ${data.streetNumber}`,
            category: data.category,
            city: data.city,
            createdBy: currentUser ? currentUser.uid : 0,
            cuisine: data.cuisine,
            description: data.description,
            email: data.email,
            facebook: `www.facebook.com/${data.facebook}`,
            instagram: `www.instagram.com/${data.instagram}`,
            location: new GeoPoint(12, 34),
            name: data.name,
            offer: data.offer,
            offers: "lunch",
            phone: data.phone,
            photoURL:
                "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
            position: new GeoPoint(12, 34),
            postcode: data.postcode,
            type_of_establishment: "restaurant",
            url: "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
            website: data.website,
            approved: false,
        });

        toast.success("Restaurant created");
        reset();
    };

    return (
        <Form onSubmit={handleSubmit(onCreateRestaurant)} noValidate>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    {...register("name", {
                        required: "Provide a name",
                        minLength: {
                            value: 1,
                            message:
                                "Restaurant name must be at least 1 character long",
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

            <Form.Group className="mb-3" controlId="streetName">
                <Form.Label>Street name</Form.Label>
                <Form.Control
                    {...register("streetName", {
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
                {errors.streetName && (
                    <Form.Text className="text-danger">
                        {errors.streetName.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="streetNumber">
                <Form.Label>Street number</Form.Label>
                <Form.Control
                    {...register("streetNumber", {
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
                {errors.streetNumber && (
                    <Form.Text className="text-danger">
                        {errors.streetNumber.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="postcode">
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                    {...register("postcode", {
                        required: "Provide a postcode",
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
                            value: 1,
                            message:
                                "Restaurant city must be at least 1 character long",
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
                                "Restaurant description must be at least 5 characters long",
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
                                "Restaurant cuisine must be at least 3 characters long",
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
                <Form.Control
                    {...register("category", {
                        required: "Provide a category",
                        minLength: {
                            value: 3,
                            message:
                                "Restaurant category must be at least 3 characters long",
                        },
                    })}
                    placeholder="Bar"
                    type="text"
                />
                {errors.category && (
                    <Form.Text className="text-danger">
                        {errors.category.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="offer">
                <Form.Label>Offer</Form.Label>
                <Form.Control
                    {...register("offer", {
                        required: "Provide an offer",
                        minLength: {
                            value: 3,
                            message:
                                "Restaurant offer must be at least 3 characters long",
                        },
                    })}
                    placeholder="Lunch"
                    type="text"
                />
                {errors.offer && (
                    <Form.Text className="text-danger">
                        {errors.offer.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    {...register("email")}
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
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    {...register("phone", {
                        maxLength: {
                            value: 9,
                            message: "Phone can be maximum 9 characters long",
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

            <Form.Group className="mb-3" controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control
                    {...register("website")}
                    placeholder="www.burgerqueenrestaurant.com"
                    type="text"
                />
                {errors.website && (
                    <Form.Text className="text-danger">
                        {errors.website.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="facebook">
                <Form.Label>Facebook</Form.Label>
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
                <Form.Label>Instagram</Form.Label>
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

            {/* <Form.Group className="mb-3" controlId="photoURL">
                <Form.Label>Image</Form.Label>
                <Form.Control as="input"
                    {...register("photoURL")}
                    type="file"
                />
                {errors.photoURL && (
                    <Form.Text className="text-danger">
                        {errors.photoURL.message}
                    </Form.Text>
                )}
            </Form.Group> */}

            <Button variant="success" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CreateRestaurantForm;
