import './../css/Footer.css';
import { SiGithub, SiLinkedin } from 'react-icons/si';

function Footer() {
    return (
        <div className="footer">
            <div className="social-icons">
                <a href="https://github.com/milorad996" target="_blank" rel="noopener noreferrer">
                    <SiGithub />
                </a>
                <a href="https://www.linkedin.com/in/milorad-savkovic-673b29183/" target="_blank" rel="noopener noreferrer">
                    <SiLinkedin />
                </a>
            </div>
            <p>&copy; 2025 Milorad Savkovic</p>
        </div>
    );
}

export default Footer;
