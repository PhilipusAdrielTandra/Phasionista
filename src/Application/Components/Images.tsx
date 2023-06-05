import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const ImageSection = () => {
    const { id } = useParams();
    const [imageIndex, setImageIndex] = useState(0);
    const [enlargeImage, setEnlargeImage] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    
    
    const handleImageClick = (index : number) => setImageIndex(index);
    const [images, setImages] = useState([
        { id:1, src: "https://picsum.photos/600/800", alt: "Product Image 1" },
        {id:2, src: "https://picsum.photos/600/800?random=2", alt: "Product Image 2" },
        { id:3,src: "https://picsum.photos/600/800?random=3", alt: "Product Image 3" }
      ]);

    function toggleEnlargeImage() {
        setEnlargeImage((pre) => !pre);
    }

    function nextImage() {
        setImageIndex((pre) => {
            return pre == images.length - 1 ? (pre = 0) : Number(pre) + 1;
        });
    }
    function previousImage() {
        setImageIndex((pre) => {
            return pre == 0 ? (pre = images.length - 1) : Number(pre) - 1;
        });
    }

    useEffect(() => {
        fetch(`http://54.252.239.220:3014/product/item/${id}`)
        .then(response => response.json())
        .then(data => {
          const { image } = data;
          console.log(image)
          const format = image.map((src, index) => {
            return {
              id: index + 1,
              src: src,
              alt: `Product Image ${index + 1}`
            };
          });
          setImages(format);

          if(data.message != "Product not found"){
          }
        })
        .catch(error => console.error(error));
      }, []); 


    const thumbnailImages = images.map((img, index) => {
        return (
            <div
            key={img.src}
            className={`rounded-lg w-full scale-80 cursor-pointer duration-200 overflow-hidden border-2
            ${img.id == imageIndex ? " border-element " : "border-transparent"}`}>
                <img
                    onClick={() => handleImageClick(index)}
                    id = {img.id}
                    src={img.src}
                    alt={img.alt}
                    className={`hover:opacity-60 w-full object-cover duration-200 ${
                        img.id == imageIndex && "  opacity-30"
                    }`}
                />
            </div>

        );
    });

    return (
        <>
            <section className="max-h-[50vh] w-full relative md:max-h-full md:gap-8 md:grid md:place-content-center overflow-hidden">
                <div>
                    <img
                        onClick={toggleEnlargeImage}
                        className="object-cover w-full md:rounded-2xl md:cursor-pointer"
                        src={images[imageIndex].src}
                        alt="img"
                    />
                </div>

                <button
                    onClick={previousImage}
                    className="absolute grid place-content-center top-1/2 -translate-y-1/2 left-5 rounded-full bg-light p-3 active:scale-110 active:text-element md:hidden">
                    <FontAwesomeIcon className="aspect-square" icon={faChevronLeft} />
                </button>

                <button
                    onClick={nextImage}
                    className="absolute grid place-content-center top-1/2 -translate-y-1/2 right-5 rounded-full bg-light p-3 active:scale-110 active:text-element  md:hidden">
                    <FontAwesomeIcon className="aspect-square" icon={faChevronRight} />
                </button>

                <div className="md:grid grid-cols-4 gap-8">{thumbnailImages}</div>
            </section>

            <div
                className={`${
                    enlargeImage ? "md:flex" : "md:hidden"
                } hidden flex-col absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full items-center justify-center bg-black/80`}>
                <div className="grid w-[500px] gap-6">
                    <div className="w-full grid place-content-end">
                        <FontAwesomeIcon
                            onClick={toggleEnlargeImage}
                            className="text-light h-6 hover:text-element cursor-pointer"
                            icon={faClose}
                        />
                    </div>
                    <div className="relative">
                        <img
                            className="object-cover rounded-2xl"
                            src={images[imageIndex].src}
                            alt="img"
                        />

                        <button
                            onClick={previousImage}
                            className="absolute grid place-content-center top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 rounded-full bg-light p-4 aspect-square active:scale-95 hover:text-element ">
                            <FontAwesomeIcon className="aspect-square" icon={faChevronLeft} />
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute grid place-content-center top-1/2 -translate-y-1/2 translate-x-1/2 right-0 rounded-full bg-light p-4 aspect-square active:scale-95 hover:text-element ">
                            <FontAwesomeIcon className="aspect-square" icon={faChevronRight} />
                        </button>
                    </div>

                    <div className="flex w-[75%] mx-auto gap-6">{thumbnailImages}</div>
                </div>
            </div>
        </>
    );
};

export default ImageSection;