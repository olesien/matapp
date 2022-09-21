import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { NavDropdown } from "react-bootstrap";

const Navigation = () => {
    const { currentUser } = useAuthContext()
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="/src/assets/icons/favicon.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />{" "}
                    Matapp
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {
                            currentUser ? (
                                <>
                                    {/* User is logged in */}

                                    <Nav.Link as={NavLink} to="/my-restaurants">My Restaurants</Nav.Link>

                                    <NavDropdown title={currentUser.email}>
                                        <NavLink to="/update-profile" className="dropdown-item">Update Profile</NavLink>
                                        <NavDropdown.Divider />
                                        <NavLink to="/logout" className="dropdown-item">Log Out</NavLink>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    {/* No user is logged in */}
                                    <Nav.Link as={NavLink} end to="/suggestion">Suggestion</Nav.Link>
                                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                    <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
