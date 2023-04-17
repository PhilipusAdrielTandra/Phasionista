// ProductPage.js

import { useState } from "react";
import { Box, Grid, GridItem, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core/styles";
import { FaShoppingCart } from "react-icons/fa";
import { Button as MaterialButton } from "@material-ui/core";
import { Button as ChakraButton } from "@chakra-ui/react";
import Header from "../Components/header"
import Heck from "../Components/heck"
import Deck from "../Components/deck"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Styles/product.css";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
  },
}));

const images = [
  {
    src: "https://picsum.photos/600/800",
    alt: "Product Image 1",
  },
  {
    src: "https://picsum.photos/600/800?random=2",
    alt: "Product Image 2",
  },
  {
    src: "https://picsum.photos/600/800?random=3",
    alt: "Product Image 3",
  },
];

const ProductPage = () => {
  const classes = useStyles();
  const [size, setSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const handleSizeChange = (event : any) => setSize(event.target.value);
  const handleImageClick = (index : any) => setActiveImage(index);

  return (
    <Box className={classes.root}>
      <Deck/>
      <Header/>
      <Grid className="product-grid">
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
              Product Name
            </Heading>
            <Text fontSize="lg" className="product-price" mb={6}>
              $49.99
            </Text>
            <select className="product-size-select" value={size} onChange={handleSizeChange}>
              <option value="">Select a size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>
            <Box mt={6}>
              <ChakraButton disabled={!size} colorScheme="blue" mr={2} className="add-to-cart-button">
                <FaShoppingCart /> Add to Cart
              </ChakraButton>
              <MaterialButton variant="contained" color="primary" className="buy-now-button">
                Buy Now
              </MaterialButton>
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Tabs mt={12} variant="unstyled">
        <TabList className="tab-list">
        <Tab _selected={{ borderBottom: "2px solid #3182CE" }}>Additional Info</Tab>
      <Tab _selected={{ borderBottom: "2px solid #3182CE" }}>Description</Tab>
      <Tab _selected={{ borderBottom: "2px solid #3182CE" }}>Reviews</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <Text fontSize="xl" mb={4}>
          Additional information about the product.
        </Text>
        <Text fontSize="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus dui eget semper ultrices.
          Quisque at ex eget nibh faucibus euismod. Donec vitae leo vel purus suscipit aliquet. Integer placerat
          gravida orci, at pharetra justo congue non. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Fusce vel sodales sem, vel imperdiet lacus.
        </Text>
      </TabPanel>
      <TabPanel>
        <Text fontSize="xl" mb={4}>
          Description of the product.
        </Text>
        <Text fontSize="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus dui eget semper ultrices.
          Quisque at ex eget nibh faucibus euismod. Donec vitae leo vel purus suscipit aliquet. Integer placerat
          gravida orci, at pharetra justo congue non. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Fusce vel sodales sem, vel imperdiet lacus.
        </Text>
      </TabPanel>
      <TabPanel>
        <Text fontSize="xl" mb={4}>
          Reviews of the product.
        </Text>
        <Text fontSize="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus dui eget semper ultrices.
          Quisque at ex eget nibh faucibus euismod. Donec vitae leo vel purus suscipit aliquet. Integer placerat
          gravida orci, at pharetra justo congue non. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Fusce vel sodales sem, vel imperdiet lacus.
        </Text>
      </TabPanel>
    </TabPanels>
  </Tabs>
</Box>

);
};

export default ProductPage;
