import React, { useState } from 'react'
import Header from "../Components/header";
import Footer from "../Components/footer";
import data from '../Data/SizeData'
import Accordion from '../Components/Accordion';
import styles from "../Styles/FAQ.module.css"


const Sizes: React.FC = () => {
    const [questions, setQuestions] = useState(data)

    return (
      <div className={styles.Size}>
        <Header></Header>
        <div className={styles.container}>
            <h3 className={styles.underline}>Our Handy Size Guide</h3>
            <h2>Welcome to our size guide! We understand that finding the perfect fit is essential for a great shopping experience. To help you choose the right size, we've put together this comprehensive size guide with measurements and tips. Please note that sizes may vary slightly between brands, so always refer to the specific measurements provided on each product page. Let's get started!</h2>
            <section className={styles.info}>
                {questions.map((question) => (
                <Accordion key={question.id} {...question} />
                ))}
            </section>
        </div>
        <Footer></Footer>
      </div>

    );
  };
      

export default Sizes;
