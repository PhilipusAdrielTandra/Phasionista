import React, { useState } from 'react'
import Header from "../Components/header";
import Footer from "../Components/footer";
import data from '../Data/QuestionData'
import Accordion from '../Components/Accordion';
import styles from "../Styles/FAQ.module.css"


const Return: React.FC = () => {
    
    const [questions, setQuestions] = useState(data)

    return (
      <div className={styles.FAQ}>
        <Header></Header>
        <div className={styles.container} >
          <h3 className={styles.underline}>Returns and Exchanges</h3>
          <p>Welcome to our Returns and Exchanges page! We want to ensure that you have a hassle-free shopping experience with us. If you are not completely satisfied with your purchase, we're here to help. Please take a moment to review our return and exchange policies outlined below.</p>
          <h3>Returns Policy</h3>
          <p>We gladly accept returns within 30 days of the delivery date for a full refund or store credit. To be eligible for a return, the item must be unused, unworn, and in its original packaging with all tags attached. Please note that certain items such as swimwear, underwear, and accessories (including jewelry and hair accessories) are non-returnable due to hygiene reasons, unless they arrived damaged or defective.</p>
          <p>To initiate a return, please follow these simple steps:</p>
          <ol>
            <li>Contact our customer support team at [insert customer support email] within 7 days of receiving your order. Provide your order number, a brief description of the reason for return, and any supporting evidence such as photographs (if applicable).</li>
            <li>Our customer support team will review your request and provide you with a return authorization (RA) number and further instructions on how to proceed.0</li>
            <li>Once you receive the RA number, securely package the item(s) you wish to return, including the original invoice or a copy of it, and affix the provided return shipping label.</li>
            <li>Drop off your package at the designated shipping carrier or schedule a pickup. Please note that return shipping costs are the customer's responsibility, unless the return is due to an error on our part (e.g., incorrect item shipped, damaged or defective item).</li>
            <li>Once we receive your returned item(s) and verify their condition, we will process your refund or issue store credit within 7 business days. Refunds will be credited back to the original payment method used during the purchase.</li>
          </ol>
          
          <h3>Exchanges</h3>
          <p>If you would like to exchange an item for a different size, color, or style, we recommend following the return process outlined above and placing a new order for the desired item. This ensures the fastest processing and availability of your desired product. If you have any questions or need assistance with the exchange process, please reach out to our customer support team.</p>
          <h3>Damaged or Defective Items</h3>
          <p>If you receive a damaged or defective item, please contact our customer support team within 48 hours of receiving your order. We will assist you in resolving the issue promptly. Please provide your order number, a description of the problem, and any supporting evidence such as photographs. We may require you to return the item or provide additional information for our records.</p>
          <h3>Final Sale and Clearance Items</h3>
          <p>Please note that final sale and clearance items are non-returnable and non-refundable unless they arrived damaged or defective.</p>

        </div>
        <Footer></Footer>
      </div>

    );
  };
      

export default Return;