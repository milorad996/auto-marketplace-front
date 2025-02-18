import AllCars from '../components/AllCars';
import FilterCars from '../components/FilterCars';
import VideoAboutCars from '../components/VideoAboutCars';
import './../css/HomeCars.css';





function HomeCars() {

    return (
        <div className="home-page">
            <div className="image-container">
                <div className='welcome-message'>
                    <h3>Your Next Ride Awaits</h3>
                </div>
            </div>
            <div className="image-bottom-line"></div>
            <FilterCars />
            <AllCars />
            <VideoAboutCars />
        </div>
    )
}

export default HomeCars;