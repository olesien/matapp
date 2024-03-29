import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { NavDropdown } from "react-bootstrap";
import Img from "../assets/icons/favicon.ico";

const Navigation = () => {
    const { currentUser, userEmail, userPhotoURL } = useAuthContext();
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={Img}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />{" "}
                    The Best Food Guide
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {currentUser?.admin ? (
                            <NavDropdown title={"Admin Panel"}>
                                <NavLink
                                    to="/admin-users"
                                    className="dropdown-item"
                                >
                                    Manage Users
                                </NavLink>
                                <NavDropdown.Divider />
                                <NavLink
                                    to="/admin-restaurants"
                                    className="dropdown-item"
                                >
                                    Manage Restaurants
                                </NavLink>
                                <NavLink
                                    to="/admin-restaurant-images"
                                    className="dropdown-item"
                                >
                                    Manage Restaurant Images
                                </NavLink>
                            </NavDropdown>
                        ) : (
                            <></>
                        )}
                        {currentUser ? (
                            <>
                                {/* User is logged in */}

                                <Nav.Link as={NavLink} to="/create-restaurant">
                                    Create a new restaurant
                                </Nav.Link>

                                <NavDropdown
                                    title={
                                        userPhotoURL ? (
                                            <Image
                                                src={userPhotoURL}
                                                height={30}
                                                width={30}
                                                fluid
                                                roundedCircle
                                            />
                                        ) : (
                                            userEmail
                                        )
                                    }
                                >
                                    <NavLink
                                        to="/update-profile"
                                        className="dropdown-item"
                                    >
                                        Update Profile
                                    </NavLink>
                                    <NavDropdown.Divider />
                                    <NavLink
                                        to="/logout"
                                        className="dropdown-item"
                                    >
                                        Log Out
                                    </NavLink>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                {/* No user is logged in */}
                                <Nav.Link as={NavLink} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
