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

const SignupPage = () => {
    const emailRef = useRef();
    // const displayNameRef = useRef()
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signup } = useAuthContext();
    const navigate = useNavigate();
    const [image, setImage] = useState(false);
    const handleFileChange = (img) => {
        if (!img.target.files.length) {
            setImage(null);
            return;
        }

        setImage(img.target.files[0]);
        console.log("File changed!", img.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // make sure user has entered the same password in both input fields
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        setError(null);

        // try to sign up the user with the specified credentials
        try {
            setLoading(true);

            await signup(
                emailRef.current.value,
                passwordRef.current.value,
                image
            );

            navigate("/");
        } catch (err) {
            setError(err.message);
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

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                {/* <Form.Group id="displayName" className="mb-3">
									<Form.Label>Username</Form.Label>
									<Form.Control type="text" ref={displayNameRef} required />
								</Form.Group> */}

                                <Form.Group id="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        ref={emailRef}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group id="image" className="mb-3">
                                    <Form.Label>Profile Image</Form.Label>
                                    <Form.Control
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

                                <Form.Group id="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        ref={passwordRef}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group
                                    id="password-confirm"
                                    className="mb-3"
                                >
                                    <Form.Label>
                                        Password Confirmation
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        ref={passwordConfirmRef}
                                        required
                                    />
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
