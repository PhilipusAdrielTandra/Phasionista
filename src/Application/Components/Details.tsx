import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faHeart, faPerson, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import ReviewsIcon from '@mui/icons-material/Reviews';

const DetailsSection = () => {

const { id }  = useParams();
  const [name, setName] = useState("Sample Product");
  const [description, setDescription] = useState("This is a sample product description.");
  const [price, setPrice] = useState("49.99");
  const sizes = ["Small", "Medium", "Large"];
  const [stock, setStock] = useState(10);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const handleSizeChange = (event : React.ChangeEvent<HTMLSelectElement>) => setSize(event.target.value);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
    fetch(`http://localhost:3014/product/item/${id}`)
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
        <section className="p-4 space-y-6 font-bold pb-10 md:grid md:place-content-center md:mb-50 md:pt-30">
            <sub className="text-element font-bold uppercase tracking-widest">
                ID: {id}
            </sub>
            <article className="space-y-4 md:space-y-6">
                <h1 className="text-3xl font-bold capitalize text-primary md:text-4xl xl:text-5xl">
                    {name}
                </h1>
                <p className="text-secondary font-normal">{description}</p>
            </article>

            <div className="flex justify-between md:flex-row">
                <div className="flex-row justify-between md:block ">
                    <div className="space-x-4 flex items-center">
                        <span className="text-2xl">${price}</span>
                    </div>
                    <p className="flex text-off ">{stock} in stock </p>
                </div>

                <div>
                    <select id="countries" className=" text-white bg-gray-800 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
                        <option className="text-black" value="">Select a size</option>
                        {sizes.map((size) => (
                            <option  className="text-black" key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            </div>


            <div className="space-y-3 md:flex-col md:space-y-4 md:mb-4 md:p-0 md:space-x-4">
                <button
                    onClick={handleSubmit}
                    className="w-full flex bg-black justify-center items-center space-x-3 p-3 bg-element rounded-md text-light shadow-2xl shadow-element md:flex-[65%] active:scale-95 hover:opacity-70 duration-200">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span>Add to cart</span>
                </button>

                <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" className="justify-between px-4 md:flex-grow">
                        <Tab className="flex-grow text-primary justify-center px-2 text-black items-center bg-element rounded-md text-light shadow-2xl shadow-element  active:scale-95 hover:opacity-70 duration-200" icon={<InfoIcon/>} label="More Info" />
                        <Tab className="flex-grow text-primary  justify-center px-2 text-black  items-center bg-element rounded-md text-light shadow-2xl shadow-element  active:scale-95 hover:opacity-70 duration-200" icon={<DescriptionIcon/>} label="Description" />
                        <Tab className="flex-grow text-primary justify-center px-4 text-black  items-center bg-element rounded-md text-light shadow-2xl shadow-element  active:scale-95 hover:opacity-70 duration-200" icon={<ReviewsIcon/>} label="Reviews" />
                </Tabs>
            </div>

        </section>
    );
};

export default DetailsSection;