import React, { useState } from 'react'
import Header from "../Components/header";
import Footer from "../Components/footer";
import data from '../Data/SizeData'
import Accordion from '../Components/Accordion';
import "../Styles/FAQ.css"


const Sizes: React.FC = () => {
    const [questions, setQuestions] = useState(data)

    return (
      <div className= "Size">
        <Header></Header>
        <div className='container'>
            <h3 className='underline'>Our Frequently Asked Questions</h3>
            <section className='info'>
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
