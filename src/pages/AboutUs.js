import './../css/AboutUs.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/auth/selectors';

function AboutUs() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <div className="about-us-container">
            <div className="about-us-hero">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>Join Us and Get to Know Us</h1>
                        <p>Become a part of our community and discover everything we have to offer.</p>
                        {!isAuthenticated && (
                            <button onClick={() => navigate('/register')} className="hero-button">
                                Sign Up
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="about-us-info">
                <h2 className="info-title">Who We Are</h2>
                <p className="info-text">
                    Founded in 2025, AutoMarketplace was created with the vision of making car buying and
                    selling easier than ever. Our platform connects sellers and buyers in a fast, secure, and
                    reliable way. With the <strong>fastest search engine</strong>, <strong>best financing options</strong>, and a user-friendly
                    experience, we are revolutionizing the way people buy and sell cars.
                </p>
                <p className="info-text">
                    Whether you're looking for your dream car or trying to sell your vehicle hassle-free,
                    AutoMarketplace is your ultimate destination. Join us and experience a seamless automotive marketplace.
                </p>
            </div>

            <div className="offer-section">
                <h2 className="offer-title">What We Offer</h2>
                <div className="offer-container">
                    <div className="offer-item">
                        <div className="offer-box sell"></div>
                        <p className="offer-text">Sell your car quickly on the most visited marketplace.</p>
                    </div>

                    <div className="offer-item">
                        <div className="offer-box buy"></div>
                        <p className="offer-text">Experience the safest way to buy a car, with verified listings.</p>
                    </div>

                    <div className="offer-item">
                        <div className="offer-box filter"></div>
                        <p className="offer-text">Find your perfect car faster with advanced search filters.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
