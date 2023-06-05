import React, { useEffect, useState } from "react";
import ARDetailsSection from "../Components/ARDetails";
import ImageSection from "../Components/Images";
import Header from '../Components/header/layout'
import Footer from '../Components/footer'
import { useParams } from "react-router-dom";

const Products = () => {
    return (
        <div>
            <Header></Header>
            <main
            className="md:grid grid-cols-2 place-content-center md:py-16 md:px-12 md:gap-16
            lg:px-36 xl:px-72 xl:gap-20">

                <ImageSection/>
                <ARDetailsSection/>
            </main>
            <Footer></Footer>
        </div>

    );
};

export default Products;