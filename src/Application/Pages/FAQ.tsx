import React, { useState } from 'react'
import Header from "../Components/header";
import Footer from "../Components/footer";
import data from '../Data/QuestionData'
import Accordion from '../Components/Accordion';
import styles from "../Styles/FAQ.module.css"


const FAQ: React.FC = () => {
    
    const [questions, setQuestions] = useState(data)

    return (
      <div className={styles.FAQ}>
        <Header></Header>
        <div className={styles.container}>
          <h3 className={styles.underline}>Our Frequently Asked Questions</h3>
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
      

export default FAQ;




