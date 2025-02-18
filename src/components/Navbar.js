import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './../css/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated } from '../store/auth/selectors';
import { logout } from '../store/auth/slice';

function NavbarComponent() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout({
            meta: {
                onSuccessLogout: handleActionSuccessLogout,
            },
        }));
        if (!isAuthenticated) {
            navigate('/');
        }
    }

    function handleActionSuccessLogout() {
        navigate(`/`);
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary custom-navbar py-2">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="me-3 auto-market">
                        AutoMarketplace.com
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="w-100">

                        <Nav className="d-flex w-100 justify-content-end align-items-center">
                            <Link to="/" className="nav-link mx-2 home-link">Home</Link>
                            {isAuthenticated && (
                                <Link to="/sell" className="nav-link mx-2 sell-link">Sell</Link>
                            )}
                            <Link to="/about" className="nav-link mx-2 about-link">About Us</Link>

                            {!isAuthenticated ? (
                                <NavDropdown
                                    title={<><FontAwesomeIcon icon={faSignInAlt} className="me-2" />Sign In</>}
                                    id="navbarScrollingDropdown"
                                    className="custom-nav-dropdown"
                                >
                                    <NavDropdown.Item as={Link} to="/login" className="custom-dropdown-item">
                                        Sign In
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register" className="custom-dropdown-item">
                                        Create Account
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Button variant="outline-danger" className="ms-3 custom-logout-button" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Log Out
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default NavbarComponent;
