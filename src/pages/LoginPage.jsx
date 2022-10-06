import { useRef, useState } from "react";
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
// import logo from '../assets/images/logo.png'
import { useForm } from "react-hook-form";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const onHandleSubmit = async (data) => {
        setError(null);

        // try to log in the user with the specified credentials
        try {
            setLoading(true);

            await login(data.email, data.password);

            navigate("/");
        } catch (err) {
            setError(
                "Something went wrong. User might not exist (try signing up)"
            );
            setLoading(false);
        }
    };

    return (
        <Container className="py-3 center-y">
            {/* <Row>
				<Col xs={{ span: 6, offset: 3 }} md={{ span: 4, offset: 4 }} className="logo-wrapper">
					<Image src={logo} fluid />
				</Col>
			</Row> */}

            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-3">Log In</Card.Title>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form
                                onSubmit={handleSubmit(onHandleSubmit)}
                                noValidate
                            >
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        {...register("email", {
                                            required: "Provide an email",
                                        })}
                                        type="email"
                                    />
                                    {errors.email && (
                                        <Form.Text className="text-danger">
                                            {errors.email.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group id="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        {...register("password", {
                                            required: "Provide a password",
                                        })}
                                        type="password"
                                    />
                                    {errors.password && (
                                        <Form.Text className="text-danger">
                                            {errors.password.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Button disabled={loading} type="submit">
                                    Log In
                                </Button>
                            </Form>

                            <div className="text-center mt-3">
                                <Link to="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="text-center mt-3">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
