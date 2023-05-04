import React, { useState } from 'react';
import '../Styles/Library.css';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Header from "../Components/header"
import Deck from "../Components/deck"
import Footer from "../Components/footer";
import LibraryData from '../Data/LibraryData.json'

type Props = {
  productsPerPage?: number;
};

function Library({ productsPerPage = 15 }: Props) {
  const [products, setProducts] = useState(LibraryData);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddToCart = (productId: number) => {
  };

  const handleAddToWishlist = (productId: number) => {
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDisplayModeChange = (mode: 'grid' | 'list') => {
    setDisplayMode(mode);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div>
      <Header />
      <div className="product-list-container">
        <div className="product-list-filters">
          <h2>Categories</h2>
          <button
            className={selectedCategory === '' ? 'active' : ''}
            onClick={() => handleCategoryFilter('')}
          >
            <Checkbox checked={selectedCategory === ''} />
            All
          </button>
          <button
            className={selectedCategory === 'men-clothing' ? 'active' : ''}
            onClick={() => handleCategoryFilter('men-clothing')}
          >
            <Checkbox checked={selectedCategory === 'men-clothing'} />
            Men's Clothing
          </button>
          <button
            className={selectedCategory === 'women-clothing' ? 'active' : ''}
            onClick={() => handleCategoryFilter('women-clothing')}
          >
            <Checkbox checked={selectedCategory === 'women-clothing'} />
            Women's Clothing
          </button>
          <h2>Display mode</h2>
          <button onClick={() => handleDisplayModeChange('grid')}>
            <Checkbox checked={displayMode === 'grid'} />
            Grid
          </button>
          <button onClick={() => handleDisplayModeChange('list')}>
            <Checkbox checked={displayMode === 'list'} />
            List
          </button>
        </div>
        <div className={`product-list ${displayMode}`}>
          {filteredProducts
            .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
            .map(product => (
              <div key={product.id} className={`product ${displayMode}`}>
                <img className={`product img ${displayMode}`} src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <div className="product-rating">
                  {[...Array(Math.round(product.rating)).keys()].map((_, index) => (
                    <span key={index} className="star">
                      ★
                    </span>
                  ))}
                </div>
                <div className="product-price">${product.price}</div>
                <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                <button onClick={() => handleAddToWishlist(product.id)}>Add to Wishlist</button>
                </div>
              ))}
          </div>
        </div>
        <div className="product-list-pagination">
      {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(pageNumber => (
        <button key={pageNumber} className={currentPage === pageNumber + 1 ? 'active' : ''} onClick={() => handlePageChange(pageNumber + 1)}>
          {pageNumber + 1}
        </button>
      ))}
    </div>
  <Footer />
  <Deck />
</div>

);
}

export default Library;
