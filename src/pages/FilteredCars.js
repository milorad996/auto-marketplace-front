import { useSelector } from "react-redux";
import FilterCars from "../components/FilterCars";
import { selectFilteredCars } from "../store/cars/selectors";
import "./../css/FilteredCars.css";
import { Link } from "react-router-dom";

function FilteredCars() {
    const filteredCars = useSelector(selectFilteredCars);


    return (
        <>
            <FilterCars />

            <div className="filtered-cars-container">
                <div className="content-wrapper">
                    <div className="filtered-results">
                        {filteredCars.length > 0 ? (
                            filteredCars.map((car) => (
                                <div key={car.id} className="car-card-two">
                                    {car.images && car.images.length > 0 && (
                                        <img src={car.images[0].url} alt={car.model_name} className="car-image-two" />
                                    )}
                                    <div className="car-details">
                                        <h3>
                                            <Link to={`/single-car/${car.id}`} className="car-link">
                                                {car.brand_name} {car.model_name}
                                            </Link>
                                        </h3>
                                        <p>Year: {car.manufacture_year}</p>
                                        <p>Kilometers: {car.mileage} km</p>
                                        <p>Price: €{car.price}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-results">No cars found. Try adjusting filters.</p>
                        )}
                    </div>

                    <div className="ads-container">
                        <div className="ad-image ad1"></div>
                        <div className="ad-image ad2"></div>
                        <div className="ad-image ad3"></div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default FilteredCars;
