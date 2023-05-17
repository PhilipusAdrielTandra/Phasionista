import React, { useState } from 'react'
import Header from "../Components/header";
import data from '../Data/QuestionData'
import Accordion from '../Components/Accordion';
import "../Styles/FAQ.css"


const FAQ: React.FC = () => {
    
    const [questions, setQuestions] = useState(data)

    return (
      <div className= "FAQ">
        <Header></Header>
        <div className='container' >
          <h3>Our Frequently Asked Questions</h3>
          <section className='info'>
            {questions.map((question) => (
              <Accordion key={question.id} {...question} />
            ))}
          </section>
        </div>
      </div>

    );
  };
      

export default FAQ;




