import { useState } from "react";
import { Box, Grid, GridItem, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core/styles";
import { FaShoppingCart } from "react-icons/fa";
import { Button as MaterialButton } from "@material-ui/core";
import { Button as ChakraButton } from "@chakra-ui/react";
import Header from "../Components/header"
import Deck from "../Components/deck"
import Footer from "../Components/footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Styles/product.css";

type Image = {
  src: string;
  alt: string;
};

type ProductProps = {
  name: string;
  images: Image[];
  description: string;
  price: string;
  sizes: string[];
  stock: number;
};

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "80px",
  },
}));

const Product = ({ name, images, description, price, sizes, stock }: ProductProps) => {
  const classes = useStyles();
  const [size, setSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const handleSizeChange = (event : React.ChangeEvent<HTMLSelectElement>) => setSize(event.target.value);
  const handleImageClick = (index : number) => setActiveImage(index);

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
            <Text fontSize="lg" className="product-stock" mt={6}>
              {stock} in stock
            </Text>
            <Text fontSize="lg" className="product-price" mb={6}>
              {price}
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
