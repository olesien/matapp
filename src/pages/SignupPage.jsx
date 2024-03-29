import { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Alert,
    Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    const [loading, setLoading] = useState(false);
    const { signup, reloadUser } = useAuthContext();
    const navigate = useNavigate();
    const [image, setImage] = useState(false);

    const handleFileChange = (img) => {
        if (!img.target.files.length) {
            setImage('https://via.placeholder.com/225');
            return;
        }

        setImage(img.target.files[0]);
    };

    const onHandleSubmit = async (data) => {

        // try to sign up the user with the specified credentials
        try {
            setLoading(true);

            await signup(
                data.email,
                data.password,
                image
            );

            toast.success("Sign up successful!");

            await reloadUser()

            navigate("/");
        } catch (err) {
            setLoading(false);
        }
    };

    return (
        <Container className="py-3 center-y">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-3">Sign Up</Card.Title>

                            <Form onSubmit={handleSubmit(onHandleSubmit)} noValidate>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        {...register("email", {
                                            required: "Provide an email",
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

                                <Form.Group className="mb-3" controlId="image" >
                                    <Form.Label>Profile Picture</Form.Label>
                                    <Form.Control
                                        {...register("image")}
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                    <Form.Text>
                                        {image
                                            ? `${image.name} (${Math.round(
                                                image.size / 1024
                                            )} kB)`
                                            : "No photo selected"}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        {...register("password", {
                                            required: "Provide a password",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            },
                                        })}
                                        type="password"
                                    />
                                    {errors.password && (
                                        <Form.Text className="text-danger">
                                            {errors.password.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password_confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control
                                        {...register("password_confirm", {
                                            required: "Confirm password",
                                            validate: value =>
                                                value === watch("password", "") || "Passwords do not match"
                                        })}
                                        type="password"
                                    />
                                    {errors.password_confirm && (
                                        <Form.Text className="text-danger">
                                            {errors.password_confirm.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Button disabled={loading} type="submit">
                                    Create Account
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <div className="text-center mt-3">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignupPage;
