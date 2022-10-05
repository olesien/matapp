import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { db, storage } from "../firebase";

export default function SubmitRestaurantImage({ id }) {
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuthContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const handleFileChange = (img) => {
        if (!img.target.files.length) {
            return;
        }

        setImage(img.target.files[0]);
        console.log("File changed!", img.target.files[0]);
    };

    const onHandleSubmit = async (data) => {
        // try to sign up the user with the specified credentials
        const title = data.title;

        if (loading) return;

        try {
            setLoading(true);

            //Add photo, use date.now to get unix before image name to make it unique!!
            const source = `photos/${currentUser.email}/${
                Date.now() + "-" + title
            }`;
            const fileRef = ref(storage, source);

            // upload photo to fileRef
            const uploadResult = await uploadBytes(fileRef, image);

            // get download url to uploaded file
            const imageurl = await getDownloadURL(uploadResult.ref);

            //Add the image doc

            await addDoc(collection(db, "user-pictures"), {
                title,
                imageurl,
                restaurantid: id,
                source,
                userid: currentUser.uid,
                approved: currentUser.admin,
            });

            toast.success("Image sent for admin approval");
            setLoading(false);
            reset()
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onHandleSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>

                <Form.Control
                    {...register("title", {
                        required: "Provide a title",
                    })}
                    placeholder="New image"
                    type="text"
                />
                {errors.title && (
                    <Form.Text className="text-danger">
                        {errors.title.message}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group id="image" className="mb-3">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
                <Form.Text>
                    {image
                        ? `${image.name} (${Math.round(image.size / 1024)} kB)`
                        : "No photo selected"}
                </Form.Text>
            </Form.Group>
            <Button variant="success" type="submit">
                {loading ? "Submitting...." : "Submit"}
            </Button>
        </Form>
    );
}
