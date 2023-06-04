import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "./SectionTitle";
import ProductGrid from "./ProductGrid";

const ShopProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  category
}: any) => {
  return (
    <div
      className={clsx("product-area", spaceTopClass, spaceBottomClass, bgColorClass)}
    >
      <div className="container">
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="products">
                <h4>Products</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="about">
                <h4>About</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="products">
              <div className="row">
                <ProductGrid
                  category={category}
                  type="bestSeller"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="about">
              <div className="row">
                <ProductGrid
                  category={category}
                  type="bestSeller"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

ShopProduct.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default ShopProduct;
