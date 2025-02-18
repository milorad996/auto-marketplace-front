import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, getFilteredCars, getModelsByBrand } from "../store/cars/slice";
import { selectBrands, selectModels } from "../store/cars/selectors";
import "../css/FilterCars.css";
import { useNavigate } from "react-router-dom";

function FilterCars() {
    const dispatch = useDispatch();
    const brands = useSelector(selectBrands);
    const models = useSelector(selectModels);
    const navigate = useNavigate();


    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [price, setPrice] = useState("");
    const [yearFrom, setYearFrom] = useState("");
    const [yearTo, setYearTo] = useState("");
    const [fuel, setFuel] = useState("");
    const [doors, setDoors] = useState("");

    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);

    const handleBrandChange = (event) => {
        const brandId = event.target.value;
        setSelectedBrand(brandId);
        setSelectedModel("");

        if (brandId) {
            dispatch(getModelsByBrand(brandId));
        }
    };

    const handleFilterSubmit = () => {

        if (!selectedBrand && !selectedModel && !price && !yearFrom && !yearTo && !fuel && !doors) {
            alert("Please select at least one filter.");
            return;
        }
        const filters = {
            brand: selectedBrand,
            model: selectedModel,
            price,
            yearFrom,
            yearTo,
            fuel,
            doors,
        };
        dispatch(getFilteredCars({ filters }));

        navigate("/filtered-cars");

    };

    return (
        <div className="filter-container">
            <div className="filter-row">
                <div className="filter-item">
                    <select id="brand" value={selectedBrand} onChange={handleBrandChange}>
                        <option value="">All Brands</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.brand_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-item">
                    <select
                        id="model"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        disabled={!selectedBrand || models.length === 0}
                    >
                        <option value="">All Models</option>
                        {models.map((model) => (
                            <option key={model.id} value={model.model_name}>
                                {model.model_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-item">
                    <input
                        id="price"
                        type="number"
                        placeholder="Price limit (€)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </div>
            <div className="filter-row">
                <div className="filter-item">
                    <select id="year-from" value={yearFrom} onChange={(e) => setYearFrom(e.target.value)}>
                        <option value="">Year From</option>
                        {Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => 1950 + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-item">
                    <select id="year-to" value={yearTo} onChange={(e) => setYearTo(e.target.value)}>
                        <option value="">Year To</option>
                        {Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => 1950 + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-item">
                    <select id="fuel" value={fuel} onChange={(e) => setFuel(e.target.value)}>
                        <option value="">Select Fuel</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>
                <div className="filter-item">
                    <select id="doors" value={doors} onChange={(e) => setDoors(e.target.value)}>
                        <option value="">Choose the number of doors</option>
                        <option value="3">3 Doors</option>
                        <option value="5">5 Doors</option>
                    </select>
                </div>
            </div>
            <div className="filter-row">
                <button className="search-btn" onClick={handleFilterSubmit}>
                    Find Your Ride
                </button>
            </div>
        </div>
    );
}

export default FilterCars;
