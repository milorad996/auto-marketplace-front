import { useEffect, useState } from "react";
import "./../css/Register.css";
import { useDispatch, useSelector } from "react-redux";
import {
    selectRegisterErrors,
    selectSuccessfullyCreatedUser,
} from "../store/auth/selectors";
import {
    register,
    setRegisterErrors,
    setSuccessfullyCreatedUser,
} from "../store/auth/slice";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaLock } from "react-icons/fa";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isCreatedUser = useSelector(selectSuccessfullyCreatedUser);
    const registerErrors = useSelector(selectRegisterErrors);

    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
        terms_of_service: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(register(userData));
    };

    useEffect(() => {
        if (registerErrors === null && isCreatedUser === "User created successfully") {
            navigate("/login");
        }
    }, [navigate, isCreatedUser, registerErrors]);

    useEffect(() => {
        return () => {
            dispatch(setRegisterErrors(null));
        };
    }, [dispatch, isCreatedUser]);

    useEffect(() => {
        return () => {
            dispatch(setSuccessfullyCreatedUser(""));
        };
    }, [dispatch, location]);

    return (
        <div className="register-container">
            <div className="register-info">
                <h2>Create Your Free Account</h2>
                <p>✔ Post your own car listings</p>
                <p>✔ Track the latest offers and deals</p>
                <p>✔ Get exclusive discounts on purchases</p>
            </div>

            <div className="register-form">
                <h2>CREATE ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={userData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={userData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                        <FaEnvelope className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input
                            type="tel"
                            name="phone_number"
                            placeholder="Phone Number"
                            value={userData.phone_number}
                            onChange={handleChange}
                            required
                        />
                        <FaPhoneAlt className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="input-icon" />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            value={userData.password_confirmation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="terms">
                        <input
                            type="checkbox"
                            name="terms_of_service"
                            checked={userData.terms_of_service}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="terms">I agree to the Terms of Service</label>
                    </div>
                    {registerErrors && (
                        <ul className="error-msg">
                            {Object.entries(registerErrors).map(([key, value]) => (
                                <li key={key}>{value}</li>
                            ))}
                        </ul>
                    )}
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
