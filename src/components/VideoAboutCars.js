import { useEffect, useState } from 'react';
import './../css/VideoAboutCars.css';

function VideoAboutCars() {
    const [inView, setInView] = useState({ firstDiv: false, secondDiv: false });

    const handleScroll = () => {
        const firstDivPosition = document.getElementById('first-div').getBoundingClientRect().top;
        const secondDivPosition = document.getElementById('second-div').getBoundingClientRect().top;

        if (firstDivPosition < window.innerHeight) {
            setInView((prevState) => ({ ...prevState, firstDiv: true }));
        }
        if (secondDivPosition < window.innerHeight) {
            setInView((prevState) => ({ ...prevState, secondDiv: true }));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="video-about-container">
            <h2 className="main-title">Best-Selling Vehicle Brands on the Website</h2>

            <div
                id="first-div"
                className={`about-section ${inView.firstDiv ? 'animate-left' : ''}`}
            >
                <div className="section-content">
                    <div className="left-content">
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/YQR4s3kcojU"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="right-content">
                        <p className="section-text">
                            <strong>BMW (Bayerische Motoren Werke)</strong> is one of the most well-known manufacturers of luxury
                            cars, motorcycles, and engines worldwide. The company was founded in 1916 in Munich,
                            Germany, and has since become synonymous with high quality, performance, and design.
                        </p>
                    </div>
                </div>
            </div>

            <div
                id="second-div"
                className={`about-section ${inView.secondDiv ? 'animate-right' : ''}`}
            >
                <div className="section-content">
                    <div className="left-content">
                        <p className="section-text">
                            <strong>Audi</strong> is a German automobile brand that is part of the Volkswagen Group. Known for its
                            innovative design, technology, and luxury cars, it was founded in 1909, and its founder
                            was August Horch.
                        </p>
                    </div>
                    <div className="right-content">
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/IaDFFA3cXHE"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoAboutCars;


