import * as React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const NavMenu = ({ menuWhiteClass, sidebarMenu }: any) => {

  return (
    <div
      className={clsx(sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)}
    >
      <nav>
        <ul>
          <li>
            <Link className="font-poppins" className="font-poppins" to={process.env.PUBLIC_URL + "/"}>
              {"Home"}
            </Link>
          </li>
          <li>
            <Link className="font-poppins" className="font-poppins" to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              {" "}
              {"Shop"}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="mega-menu">
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop/111b009e-a0a1-4318-ab2a-0f57e9eefabe"} key={"2"}>
                      {"Shops"}
                    </Link>
                  </li>
                  <li>
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop/111b009e-a0a1-4318-ab2a-0f57e9eefabe"} key={"1"}>
                      {"Ryan Gosling"}
                    </Link>
                  </li>
                  <li>
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop1/41e8f21b-315c-452c-9a7d-00e31542b962"}  key={"4"}>
                      {"Brad Pitt"}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/product/3052084f-075e-49f0-a881-b75ba414d986"}>
                      {"AR products"}
                    </Link>
                  </li>
                  <li>
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/ARproduct/3052084f-075e-49f0-a881-b75ba414d986"}>
                      {"Champion's shirt women"}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <Link className="font-poppins" to={process.env.PUBLIC_URL + "/library"}>
              {"Collection"}
            </Link>
          </li>
          <li>
            <Link className="font-poppins" to={process.env.PUBLIC_URL + "/"}>
              {"Pages"}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/cart"}>
                  {"Cart"}
                </Link>
              </li>
              <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/checkout"}>
                  {"Checkout"}
                </Link>
              </li>
              <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/wishlist"}>
                  {"Wishlist"}
                </Link>
              </li>
              <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/login"}>
                  {"Login"}
                </Link>
              </li>
              <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/profile"}>
                  {"Profile"}
                </Link>
              </li>
              <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/register"}>
                  {"Register"}
                </Link>
              </li>
              <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/about"}>
                  {"About Us"}
                </Link>
              </li>
              <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/contact"}>
                  {"Contact Us"}
                </Link>
              </li>
              <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/404"}>
                  {"404 Page"}
                </Link>
              </li>
              <li>
                <Link className="font-poppins" to={process.env.PUBLIC_URL + "/product/sample-product"}>
                  {"Product"}
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="font-poppins" to={process.env.PUBLIC_URL + "/joinchat"}>
              {"Chat"}
            </Link>
          </li>
          <li>
            <Link className="font-poppins" to={process.env.PUBLIC_URL + "/about"}>
              {"About Us"}
            </Link>
          </li>
          <li>
            <Link className="font-poppins" to={process.env.PUBLIC_URL + "/orders"}>
              {"Transactions"}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
