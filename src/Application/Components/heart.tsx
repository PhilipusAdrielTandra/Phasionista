import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import '../Styles/LibraryCartBtn.css'

function Heart() {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <IconButton color="secondary" onClick={handleHeartClick} style={{ position: 'absolute' }}>
        {isLiked ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}

export default Heart;