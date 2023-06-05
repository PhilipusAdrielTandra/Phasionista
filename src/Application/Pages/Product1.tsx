import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core/styles";
import { FaShoppingCart } from "react-icons/fa";
import { Button, Button as MaterialButton } from "@material-ui/core";
import Header from "../Components/header/layout";
import Deck from "../Components/deck"
import Footer from "../Components/footer";
import { Carousel } from "react-responsive-carousel";
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Styles/product.css";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "10px",
  },
}));

const Product = () => {
  const { id }  = useParams();
  const [name, setName] = useState("Sample Product");
  const images = [
    { src: "https://picsum.photos/600/800", alt: "Product Image 1" },
    { src: "https://picsum.photos/600/800?random=2", alt: "Product Image 2" },
    { src: "https://picsum.photos/600/800?random=3", alt: "Product Image 3" }
  ];
  const [description, setDescription] = useState("This is a sample product description.");
  const [price, setPrice] = useState("49.99");
  const sizes = ["Small", "Medium", "Large"];
  const [stock, setStock] = useState(10);
  const [quantity, setQuantity] = useState(1);
  const classes = useStyles();
  const [size, setSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const handleSizeChange = (event : React.ChangeEvent<HTMLSelectElement>) => setSize(event.target.value);
  const handleImageClick = (index : number) => setActiveImage(index);

  const increaseQty = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Added to cart:', quantity);
  };

  const handleInputChange = (event: any) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  useEffect(() => {
    fetch(`http://54.252.239.220:3014/product/item/${id}`)
    .then(response => response.json())
    .then(data => {
      const { id, name, stock, sales, description, price, ge_product_category_id, created_at, updated_at } = data;
      console.log(id, name, stock, sales, description, price, ge_product_category_id, created_at, updated_at);

      if(data.message != "Product not found"){
        setName(name);
        setDescription(description);
        setPrice(price);
        setStock(stock);
      }
    })
    .catch(error => console.error(error));
  }, []); 

  return (
    <Header headerTop="visible">
    <Box className={classes.root}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Box className="image-gallery">
            <Carousel showThumbs={false} selectedItem={activeImage} onClickItem={handleImageClick}>
              {images.map((image, index) => (
                <div key={image.src}>
                  <img className="product-image" src={image.src} alt={image.alt} />
                </div>
              ))}
            </Carousel>
            <Box className="image-selector">
              {images.map((image, index) => (
                <img
                  key={image.src}
                  className={`image-selector-thumbnail ${activeImage === index ? "active" : ""}`}
                  src={image.src}
                  alt={image.alt}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Box className="product-info">
            <Heading mb={4} size="2xl" className="product-name">
              {name}
            </Heading>
            <Text className="product-id" mt={6}>
              ID: {id}
            </Text>
            <Text fontSize="lg" className="product-stock" mt={6}>
              {stock} in stock
            </Text>
            <Text fontSize="lg" className="product-price" mb={6}>
              ${price}
            </Text>
            <select className="product-size-select" value={size} onChange={handleSizeChange}>
              <option value="">Select a size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <Box mt={6}>
            <form className="wrapper" onSubmit={handleSubmit}>
              <div className="cart-box">
                <div className="qty qty-minus" onClick={decreaseQty}>
                  -
                </div>
                <input
                  contentEditable="true"
                  id="cartQty"
                  className="qty"
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}  
                  min="1"
                />
                <div className="qty qty-plus" onClick={increaseQty}>
                  +
                </div>
              </div>
              <button  className="w-1/2 text-white bg-[#060606] my-2 rounded-md  p-3 text-center flex items-center justify-center -mt-1 hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                    Add to cart
              </button>
            </form>
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <div className="centerify">
      <Tabs mt={12} variant="unstyled">
      <TabList className="tab-list">
        <Tab _selected={{ borderBottom: "2px solid #000000" }}>Additional Info</Tab>
        <Tab _selected={{ borderBottom: "2px solid #000000" }}>Description</Tab>
        <Tab _selected={{ borderBottom: "2px solid #000000" }}>Reviews</Tab>
      </TabList>
          <TabPanels>
       <TabPanel>
      <Text fontSize="xl" mb={4}>
         Additional information about the product.
      </Text>
         <Text fontSize="md">
            {description}
        </Text>
      </TabPanel>
      <TabPanel>
      <Text fontSize="xl" mb={4}>
          Description of the product.
      </Text>
       <Text fontSize="md">
          {description}
       </Text>
      </TabPanel>
      <TabPanel>
      <Text fontSize="xl" mb={4}>
         Reviews of the product.
      </Text>
      <Text fontSize="md">
      Lorem ipsum 
      </Text>
           </TabPanel>
         </TabPanels>
       </Tabs>
       </div>
      <Footer/>
      <Deck/>
</Box>
</Header>
);
};

export default Product;
