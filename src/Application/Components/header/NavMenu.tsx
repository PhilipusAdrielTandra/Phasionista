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
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop/RyanGosling"}>
                      {"Shops"}
                    </Link>
                  </li>
                  <li>
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop/RyanGosling"}>
                      {"Ryan Gosling"}
                    </Link>
                  </li>
                  <li>
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/shop/BradPitt"}>
                      {"Brad Pitt"}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/product/1"}>
                      {"AR products"}
                    </Link>
                  </li>
                  <li>
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/product/1"}>
                      {"Product 1"}
                    </Link>
                  </li>
                  <li>
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/product-tab-left/1"}>
                      {"Product 2"}
                    </Link>
                  </li>
                  <li>
                    <Link className="font-poppins" to={process.env.PUBLIC_URL + "/product-tab-right/1"}>
                      {"Product 3"}
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
