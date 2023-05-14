import React, { useState, useEffect } from 'react';
import '../Styles/LibraryCartBtn.css'

function LibraryCartBtn() {
  const [isClicked, setIsClicked] = useState(false);

  const handleCartClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 3500);
  };

  const buttonClassName = `cart-button ${isClicked ? 'clicked' : ''}`;

  return (
    <div>
        <button className={buttonClassName} onClick={handleCartClick}>
            <span className="add-to-cart" onClick={handleCartClick}>Add to cart</span>
            <span className="added">Added</span>
        </button>
    </div>
  );
}

export default LibraryCartBtn;