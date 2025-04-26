import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './../css/SingleCar.css';
import { selectSimilarCars, selectSingleCar } from '../store/cars/selectors';
import { getCar, getSimilarCars, deleteCar } from '../store/cars/slice';
import { selectActiveUser, selectIsAuthenticated } from '../store/auth/selectors';

function SingleCar() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const car = useSelector(selectSingleCar);
    const similarCars = useSelector(selectSimilarCars);
    const activeUser = useSelector(selectActiveUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        dispatch(getCar(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (car && car.brand) {
            dispatch(getSimilarCars({ brand: car.brand, carId: id }));
        }
    }, [dispatch, car, id]);

    const handleNext = () => {
        if (car?.images && currentImageIndex < car.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePrev = () => {
        if (car?.images && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handleDeleteCar = () => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            dispatch(deleteCar(id));
            navigate('/');
        }
    };

    return (
        <div className="single-car-container">
            {car ? (
                <>
                    <div className="image-slider">
                        {car.images && car.images.length > 1 && (
                            <>
                                <button className="prev" onClick={handlePrev}>‹</button>
                                <div className="main-image">
                                    <img
                                        src={car.images[currentImageIndex]}
                                        alt="Car"
                                        className="main-image-img"
                                    />
                                </div>
                                <button className="next" onClick={handleNext}>›</button>
                            </>
                        )}
                        {car.images && car.images.length === 1 && (
                            <div className="main-image">
                                <img
                                    src={car.images[0]}
                                    alt="Car"
                                    className="main-image-img"
                                />
                            </div>
                        )}
                    </div>

                    {car.images && car.images.length > 1 && (
                        <div className="image-thumbnails">
                            {car.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`thumbnail-${index}`}
                                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => handleThumbnailClick(index)}
                                />
                            ))}
                        </div>
                    )}

                    {isAuthenticated && activeUser?.id === car.user_id && (
                        <button className="delete-car-button" onClick={handleDeleteCar}>
                            Delete Car
                        </button>
                    )}

                    <div className="car-details2">
                        <h2 className="car-details2-title">Vehicle Specifications</h2>
                        <div className="car-details2-container">
                            <div className="details-column">
                                <p><span className="spec-label">Brand:</span> {car.brand}</p>
                                <p><span className="spec-label">Model:</span> {car.model}</p>
                                <p><span className="spec-label">Year:</span> {car.manufacture_year}</p>
                                <p><span className="spec-label">Price:</span> ${car.price}</p>
                            </div>
                            <div className="details-column">
                                <p><span className="spec-label">Fuel Type:</span> {car.fuel_type}</p>
                                <p><span className="spec-label">Doors:</span> {car.door_count}</p>
                                <p><span className="spec-label">Mileage:</span> {car.mileage}</p>
                                <p><span className="spec-label">Body Type:</span> {car.body_type}</p>
                            </div>
                        </div>
                    </div>

                    <div className="similar-cars">
                        <h2 className="similar-cars-title">Explore Similar Vehicles</h2>
                        {similarCars.length > 0 ? (
                            <div className="similar-cars-grid">
                                {similarCars.map((car, index) => (
                                    <Link key={index} to={`/single-car/${car?.id}`} className="similar-car-card">
                                        <img
                                            src={car.images?.[0]}
                                            alt={car.model}
                                            className="similar-car-image"
                                        />
                                        <h3>{car.brand} {car.model}</h3>
                                        <p>${car.price}</p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="no-similar-cars">No similar cars found</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SingleCar;
