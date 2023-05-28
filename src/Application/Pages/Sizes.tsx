import React, { useState } from 'react'
import Footer from "../Components/footer";
import data from '../Data/SizeData'
import Accordion from '../Components/Accordion';
import styles from "../Styles/FAQ.module.css"
import Header from "../Components/header/layout";


const Sizes: React.FC = () => {
    const [questions, setQuestions] = useState(data)

    return (
      <Header headerTop="visible">
        <div className={styles.Size}>
          <div className={styles.container}>
              <h3 className={styles.underline}>Our Handy Size Guide</h3>
              <p>Welcome to our size guide! We understand that finding the perfect fit is essential for a great shopping experience. To help you choose the right size, we've put together this comprehensive size guide with measurements and tips. Please note that sizes may vary slightly between brands, so always refer to the specific measurements provided on each product page. Let's get started!</p>
              <section className={styles.info}>
                  {questions.map((question) => (
                  <Accordion key={question.id} {...question} />
                  ))}
              </section>
          </div>
          <Footer></Footer>
        </div>
      </Header>

    );
  };
      

export default Sizes;
