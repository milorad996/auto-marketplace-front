import { useEffect } from "react";
import { getCars, setCurrentPage } from "../store/cars/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectCars } from "../store/cars/selectors";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "./../css/AllCars.css";

function AllCars() {
    const dispatch = useDispatch();
    const cars = useSelector(selectCars);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCars({ page: 1 }));
    }, [dispatch]);

    const loadMoreCars = (page) => {
        dispatch(getCars({ page }));
        dispatch(setCurrentPage(page));
    };

    const nextPage = cars.current_page + 1;
    const prevPage = cars.current_page - 1;

    return (
        <Container className="all-cars-container">
            <Row className="justify-content-center">
                {cars.data?.slice(0, 15).map((car, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={4} className="car-card-wrapper">
                        <Card className="car-card" onClick={() => navigate(`/single-car/${car?.id}`)}>
                            <div className="car-image-wrapper">
                                <Card.Img
                                    variant="top"
                                    src={car.images?.length > 0 ? car.images[0] : "/default-car.jpg"}
                                    className="car-image"
                                />
                            </div>
                            <Card.Body>
                                <Card.Text className="car-brand-model">
                                    {car.brand} {car.model}
                                </Card.Text>
                                <Card.Text className="car-price">{car.price} €</Card.Text>
                                <Card.Text className="car-mileage">{car.mileage} km</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="pagination-container">
                <Button
                    variant="outline-success"
                    onClick={() => loadMoreCars(prevPage)}
                    disabled={cars.current_page <= 1}
                    className="pagination-button"
                >
                    <FaChevronLeft />
                </Button>


                <Button
                    variant="outline-success"
                    onClick={() => loadMoreCars(nextPage)}
                    disabled={cars.current_page >= cars.last_page}
                    className="pagination-button"
                >
                    <FaChevronRight />
                </Button>
            </div>
        </Container>
    );
}

export default AllCars;
