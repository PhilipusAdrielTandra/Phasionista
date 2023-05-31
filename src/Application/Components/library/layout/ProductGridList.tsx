import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ProductGridListSingle from "../layout/ProductGridListSingle";

const ProductGridList = ({
  products,
  spaceBottomClass
}: any) => {
  const currency = useSelector((state: any) => state.currency);
  const { cartItems } = useSelector((state: any) => state.cart);
  const { wishlistItems } = useSelector((state: any) => state.wishlist);
  const { compareItems } = useSelector((state: any) => state.compare);
  
  return (
    <Fragment>
      {products?.map((product: any) => {
        return (
          <div className="col-xl-4 col-sm-6" key={product.id}>
            <ProductGridListSingle
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              cartItem={
                cartItems.find((cartItem: any) => cartItem.id === product.id)
              }
              wishlistItem={
                wishlistItems.find(
                  (wishlistItem: any) => wishlistItem.id === product.id
                )
              }
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductGridList.propTypes = {
  products: PropTypes.array,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridList;
