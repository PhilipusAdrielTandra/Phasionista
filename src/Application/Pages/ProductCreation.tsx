import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AWS from 'aws-sdk';
import { getDiscountPrice } from "../Components/productHelper";
import SEO from "./SEO";
import Header from "../Components/header/layout";

const ProductCreation = () => {
  let cartTotalPrice = 0;

  let { pathname } = useLocation();
  const currency = useSelector((state: any) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [uploadedPictures, setUploadedPictures] = useState([]);

  const handlePictureUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const picturesArray = Array.from(files).slice(0, 5); // Limit to 5 pictures
      const uploadedPicturesCopy = [...uploadedPictures];

      picturesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          uploadedPicturesCopy.push(base64Image);
          setUploadedPictures(uploadedPicturesCopy);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handlePictureUploadToS3 = async (file) => {
    const fileName = `${Date.now()}_${file.name}`;

    const params = {
      Bucket: 'YOUR_S3_BUCKET_NAME',
      Key: fileName,
      ContentType: file.type,
      Body: file,
      ACL: 'public-read'
    };

    try {
      await s3.upload(params).promise();
      console.log(`Picture ${fileName} uploaded successfully to AWS S3.`);
    } catch (error) {
      console.error('Error uploading picture to AWS S3:', error);
    }
  };

  const handleUploadButtonClick = () => {
    const uploadPromises = uploadedPictures.map((base64Image) => {
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
      const file = new Buffer.from(base64Data, 'base64');
      return handlePictureUploadToS3(file);
    });

    Promise.all(uploadPromises)
      .then(() => {
        console.log('All pictures uploaded to AWS S3.');
        // Perform additional actions after successful upload
      })
      .catch((error) => {
        console.error('Error uploading pictures to AWS S3:', error);
      });
  };


  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of Phasionista"
      />
      <Header headerTop="visible">
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Product Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Product Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Quantity</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Price</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Categories</label>
                          <input
                            placeholder="Category1, Category2, etc"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Description</h4>
                      <div className="additional-info">
                        <textarea
                          placeholder="Describe your product."
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>

                  {uploadedPictures.length > 0 && (
                    <div>
                        <h4>Uploaded Pictures:</h4>
                        <div>
                        {uploadedPictures.map((picture, index) => (
                            <img key={index} src={picture} alt={`Uploaded Picture ${index + 1}`} />
                        ))}
                        </div>
                    </div>
                    )}
                </div>
                <div className="col-lg-5">
                <div className="your-order-area">
                    <h3>Pictures</h3>
                    <div className="place-order mt-25">
                    <input type="file" accept="image/*" multiple onChange={handlePictureUpload} />
                    <button className="btn-hover" onClick={handleUploadButtonClick}>
                        <span className="icon-cloud-upload"></span> Upload Pictures
                    </button>
                    </div>
                </div>
                </div>
              </div>
          </div>
        </div>
      </Header>
    </Fragment>
  );
};

export default ProductCreation;
