import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faHeart, faPerson, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { addToCartAPI } from "../Redux/cart-slice";
import { useDispatch } from "react-redux";

const DetailsSection = () => {

  const { id }  = useParams();
  const [name, setName] = useState("Sample Product");
  const [description, setDescription] = useState("This is a sample product description.");
  const [price, setPrice] = useState("49.99");
  const sizes = ["Small", "Medium", "Large"];
  const [stock, setStock] = useState(10);
  const [quantity, setQuantity] = useState(1);
  const [addInfo, setAddInfo] = useState("")
  const [size, setSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const handleSizeChange = (event : React.ChangeEvent<HTMLSelectElement>) => setSize(event.target.value);
  const [value, setValue] = React.useState(0);
  const [product, setProduct] = useState(null)
  const [data, setData] = useState("");
  const dispatch = useDispatch();

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

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return (
          <div>
            <p>{addInfo}</p>
          </div>
        );
      case 1:
        return (
          <div>
            {description}
          </div>
        );
      case 2:
        return (
          <div>
            {/* Content for the "Reviews" tab */}
            {/* ... */}
          </div>
        );
      default:
        return null;
    }
  };

  const fetchProfileData = async (retailer_id) => {
    const cookies = document.cookie; 

    const match = cookies.match(/access-token=([^;]+)/);

    let accessToken = null;
    if (match) {
      accessToken = match[1]; // Extract the cookie value

      if(accessToken == ""){
        await refreshAccessToken()
        accessToken = cookies.match(/access-token=([^;]+)/)[1];
      }
    }

    try {
      const response = await fetch(`http://13.55.179.38:3015/seller/retailer/${retailer_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData)
      }

    } catch (error) {
      // Handle the exception
    }
  };

  useEffect(() => {
    fetch(`http://13.55.179.38:3014/product/item/${id}`)
    .then(response => response.json())
    .then(data => {
      const { id, name, stock, sales, fullDescription, shortDescription, price, retailer_id} = data;

      if(data.message != "Product not found"){
        setName(name);
        setAddInfo(shortDescription);
        setDescription(fullDescription);
        setPrice(price);
        setStock(stock);
        setProduct(data);
        fetchProfileData(retailer_id);
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
                    <button onClick={() => window.location.href = `/shop/${data.id}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={data ? data.image : ""} alt={"shop"} style={{ width: '2rem', height: '2rem', borderRadius: '3rem' }} />
                    <span>{data ? data.retailer_name : ""}</span>
                  </button>
                </div>

                <div>
                    {/* <select id="countries" className=" text-white bg-gray-800 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
                        <option className="text-black" value="">Select a size</option>
                        {sizes.map((size) => (
                            <option  className="text-black" key={size} value={size}>{size}</option>
                        ))}
                    </select> */}
                </div>
            </div>


            <div className="space-y-3 md:flex-col md:space-y-4 md:mb-4 md:p-0 md:space-x-4">
                <button
                    onClick={handleSubmit}
                    className="w-full flex bg-black justify-center items-center space-x-3 p-3 bg-element rounded-md text-light shadow-2xl shadow-element md:flex-[65%] active:scale-95 hover:opacity-70 duration-200">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span onClick={() => addToCartAPI(product, dispatch)}>Add to cart</span>
                </button>

                <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" className="justify-between px-4 md:flex-grow">
                        <Tab className="flex-grow text-primary justify-center px-2 text-black items-center bg-element rounded-md text-light shadow-2xl shadow-element  active:scale-95 hover:opacity-70 duration-200" icon={<InfoIcon/>} label="More Info"/>
                        <Tab className="flex-grow text-primary justify-center px-2 text-black  items-center bg-element rounded-md text-light shadow-2xl shadow-element  active:scale-95 hover:opacity-70 duration-200" icon={<DescriptionIcon/>} label="Description" />
                        <Tab className="flex-grow text-primary justify-center px-4 text-black  items-center bg-element rounded-md text-light shadow-2xl shadow-element  active:scale-95 hover:opacity-70 duration-200" icon={<ReviewsIcon/>} label="Reviews" />
                </Tabs>
                {renderTabContent()}
            </div>

        </section>
    );
};

export default DetailsSection;

