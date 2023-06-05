import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authStore } from "../../Redux/authenticationState";
import clsx from "clsx";
import profile from "../../Assets/images/profile-icon.png"
import MenuCart from "./MenuCart";
import { setCartItems } from "../../Redux/cart-slice";
import { store } from "../../Redux/store";
import { deleteAllFromWishlist, setWishlist } from "../../Redux/wishlist-slice";
import { useEffect, useState } from "react";
import { setProducts } from "../../Redux/product-slice";

const IconGroup = ({ iconWhiteClass }: any) => {
  const isAuthenticated: boolean = authStore.getState().authen.authenticated;
  const userProfilePicture = null;
  const handleClick = (e: any) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { compareItems } = useSelector((state: any) => state.compare);
  const { wishlistItems } = useSelector((state: any) => state.wishlist);
  const { cartItems } = useSelector((state: any) => state.cart);
  const [data, setData] = useState("") 

  const fetchProfileData = async () => {
    const cookies = document.cookie;
    const match = cookies.match(/access-token=([^;]+)/);

    let accessToken = null;
    if (match) {
      accessToken = match[1]; // Extract the cookie value
    }

    try {
      const response = await fetch(`http://54.252.239.220:3016/user/getbyid`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      }

    } catch (error) {
      // Handle the exception
    }
  };

  const [search, setSearch] = useState("")
  const fetchSearchData = async (search) => {
    try {
      const response = await fetch(`http://54.252.239.220:3014/product/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: search })
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData)
        store.dispatch(setProducts(jsonData));
      }

      else {
        // refreshAccessToken()
        // window.location.reload()
      }

    } catch (error) {
      // Handle the exception
    }
  };

  useEffect(() => {
    fetchSearchData(search);
  }, [search]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)} >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={handleClick}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" onChange={handleSearchChange} value={search}/>
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          {isAuthenticated ? (
            <img
              src={userProfilePicture || profile}
              style={{width: "1.5rem", height: "1.5rem"}}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <img
              src={ profile }
              style={{width: "1.5rem", height: "1.5rem"}}
              alt="Profile"
              className="profile-picture"
            />
          )}
        </button>
        {isAuthenticated ? 
          <div className="account-dropdown">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/profile"}>
                my account
              </Link>
              { data.retailer_id ? <Link to={process.env.PUBLIC_URL + `/shop/${data.retailer_id}`}>
                My Shop
              </Link> :

              <Link to={process.env.PUBLIC_URL + "/create-shop"}>
                Open Shop
              </Link> }
              <Link to={process.env.PUBLIC_URL + "/home"} style={{ color: "red" }} onClick={() => { 
                authStore.dispatch({ type: "logout"});
                window.location.reload();
                window.location.href = "/home";
                store.dispatch(setCartItems([]));
                store.dispatch(deleteAllFromWishlist())
                store.dispatch(setWishlist([]));
                document.cookie = `access-token=null; path=/;`;
                document.cookie = `refresh-token=null; path=/;`;
                document.cookie = `connect.sid=""'; path=/;`;
              }
                
                }>
                log out
              </Link>
            </li>
          </ul>
        </div> :
        <div className="account-dropdown">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login"}>Login</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/register"}>
                Register
              </Link>
            </li>
          </ul>
        </div>}
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};



export default IconGroup;
