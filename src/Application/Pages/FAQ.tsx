import React, { useState } from 'react'
import Header from "../Components/header";
import data from '../Components/QuestionData'
import SingleQuestion from '../Components/Question'
import Accordion from '../Components/Accordion';


const FAQ: React.FC = () => {
    
    const [questions, setQuestions] = useState(data)

    return (
        <div className='container'>
        <h3>questions and answers about login</h3>
        <section className='info'>
          {questions.map((question) => (
            <Accordion key={question.id} {...question} />
          ))}
        </section>
      </div>
    );
  };
      

export default FAQ;




