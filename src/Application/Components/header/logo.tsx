import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import logo from "../../Assets/branding/logo.png"

const Logo = ({ imageUrl, logoClass }: any) => {
  return (
    <div className={clsx(logoClass)}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        <img alt="" src={logo}  style={{ width: "2rem", height: "4rem", paddingBottom: "2rem"}}/>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
