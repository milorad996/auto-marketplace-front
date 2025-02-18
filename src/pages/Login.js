import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setLoginErrors } from "../store/auth/slice";
import { selectIsAuthenticated, selectLoginErrors } from "../store/auth/selectors";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import './../css/Login.css';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginErrors = useSelector(selectLoginErrors);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(userData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => {
            dispatch(setLoginErrors(null));
        };
    }, [dispatch]);

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {loginErrors && (
                        <ul className="error-msg">
                            {Object.entries(loginErrors).map(([key, value]) => (
                                <li key={key}>{value}</li>
                            ))}
                        </ul>
                    )}
                    <button type="submit" className="login-btn">Sign In</button>
                </form>

                <div className="register-prompt">
                    <p>Don't have an account?</p>
                    <button onClick={() => navigate("/register")} className="register-btn">
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
