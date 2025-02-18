import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCar, clearCarErrors } from "../store/cars/slice";
import { selectBrands, selectCarErrors } from "../store/cars/selectors";
import './../css/SellCarPage.css';

function SellCarPage() {
    const dispatch = useDispatch();
    const brands = useSelector(selectBrands);
    const carErrors = useSelector(selectCarErrors);




    const [formData, setFormData] = useState({
        brand_id: 0,
        model_name: "",
        price: "",
        manufacture_year: "",
        mileage: "",
        body_type: "",
        fuel_type: "",
        door_count: "",
        description: "",
        images: [""]
    });

    useEffect(() => {
        dispatch(clearCarErrors());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (index, e) => {
        const newImages = [...formData.images];
        newImages[index] = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            images: newImages
        }));
    };

    const handleAddImage = () => {
        if (formData.images.length < 5) {
            setFormData((prevData) => ({
                ...prevData,
                images: [...prevData.images, ""]
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCar(formData));
    };

    const currentYear = new Date().getFullYear();

    const generateYearOptions = () => {
        let years = [];
        for (let year = 1950; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    };

    return (
        <div className="sell-car-page">
            <div className="info-container">
                <h2>Sell Your Car on the Most Popular Marketplace</h2>
                <p><strong className="info-strong">✔</strong> Reach thousands of potential buyers every day.</p>
                <p><strong className="info-strong">✔</strong> Get your car listed with ease.</p>
                <p><strong className="info-strong">✔</strong> Quick and secure transactions.</p>
                <p><strong className="info-strong">✔</strong> Easy upload process for your car images.</p>
                <p><strong className="info-strong">✔</strong> Create your ad in minutes!</p>
                <div className="info-image"></div>
            </div>

            <div className="form-container">
                <h2>Post Your Car for Sale</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <select
                            className="select-brand"
                            name="brand_id"
                            value={formData.brand_id}
                            onChange={handleChange}
                            required
                            id="brands"
                        >
                            <option value="">Select Brand</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand?.brand_name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="model_name"
                            placeholder="Model Name"
                            value={formData.model_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="manufacture_year"
                            value={formData.manufacture_year}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Manufacture Year</option>
                            {generateYearOptions().map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <select
                            name="body_type"
                            value={formData.body_type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Body Type</option>
                            <option value="SEDAN">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="HATCHBACK">Hatchback</option>
                            <option value="COUPE">Coupe</option>
                        </select>

                        <select
                            name="fuel_type"
                            value={formData.fuel_type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <select
                            name="door_count"
                            value={formData.door_count}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Door Count</option>
                            <option value="3">3 Doors</option>
                            <option value="5">5 Doors</option>
                        </select>
                        <input
                            type="number"
                            name="mileage"
                            placeholder="Mileage"
                            value={formData.mileage}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <div className="images-container">
                        {formData.images.map((image, index) => (
                            <div key={index} className="image-input">
                                <input
                                    type="url"
                                    name={`image-${index}`}
                                    placeholder="Image URL"
                                    value={image}
                                    onChange={(e) => handleImageChange(index, e)}
                                    required
                                />
                            </div>
                        ))}
                        {formData.images.length < 5 && (
                            <button
                                type="button"
                                className="add-image-button"
                                onClick={handleAddImage}
                            >
                                Add Another Image
                            </button>
                        )}
                    </div>
                    {carErrors && <p className="error-message">{carErrors}</p>}


                    <button type="submit" className="submit-button">
                        Create Your Ad
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SellCarPage;
