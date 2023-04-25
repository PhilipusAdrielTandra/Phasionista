import { Link } from 'react-router-dom';
import Header from "../Components/header"
import Deck from "../Components/deck"
import Footer from "../Components/footer";
import { FaFrown, FaHome } from 'react-icons/fa';
import '../Styles/NotFound.css';

const NotFound = () => {
  return (
    <div>
    <Header/>
    <div className="not-found-container">
        <FaFrown className="not-found-icon" />
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-text">We're sorry, but the page you're looking for doesn't exist. Probably still in development</p>
        <Link to="/" className="not-found-link">
            <FaHome className="not-found-link-icon" />
            Back to Home
        </Link>
    </div>
        <Footer/>
        <Deck/>
    </div>
  );
};

export default NotFound;
