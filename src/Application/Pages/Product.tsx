import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core/styles";
import { FaShoppingCart } from "react-icons/fa";
import { Button as MaterialButton } from "@material-ui/core";
import { Button as ChakraButton } from "@chakra-ui/react";
import Header from "../Components/header"
import Deck from "../Components/deck"
import Footer from "../Components/footer";
import { Carousel } from "react-responsive-carousel";
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Styles/product.css";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "80px",
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
  const classes = useStyles();
  const [size, setSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const handleSizeChange = (event : React.ChangeEvent<HTMLSelectElement>) => setSize(event.target.value);
  const handleImageClick = (index : number) => setActiveImage(index);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
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
    <Box className={classes.root}>
      <Header/>
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
            <MaterialButton
                variant="outlined"
                color="default"
                className="buy-now-button custom-button"
              >
                Add to Cart
              </MaterialButton>
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
);
};

export default Product;
