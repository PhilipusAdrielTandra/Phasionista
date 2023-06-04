
import IonIcon from '@reacticons/ionicons';
import React, { Component } from "react";

export const ContactSection: React.FC = () => {
  return (
    <div className='antialiased bg-gray-100'>
        <div className="flex w-full min-h-screen justify-center items-center">
          <div className="flex flex-col md:flex-row md:justify-between md:space-x-10 md:space-y-0 space-y-6 bg-[#26547C] w-full max-w-4xl p-8 rounded-xl shadow-lg text-white">
            <div className="flex flex-col  space-y-8 justify-between">
              <div>
                <h1 className="font-bold text-white text-4xl tracking-wide">Contact Us</h1>
                <p className="pt-2 text-[#C5D5EA] text-sm">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
              <div className='flex flex-col space-y-6'>
                <div className="inline-flex space-x-2 items-center">
                  <IonIcon name="call" className='text-[#7B8CDE] text-xl'></IonIcon>
                  <span className="font-poppins">+(123) 456 7890</span>
                </div>
                <div className="inline-flex space-x-2 items-center">
                  <IonIcon name="mail" className='text-[#7B8CDE] text-xl'></IonIcon>
                  <span className="font-poppins">contact@phasionista.com</span>
                </div>
                <div className="inline-flex space-x-2 items-center">
                  <IonIcon name="location" className='text-[#7B8CDE] text-xl'></IonIcon>
                  <span className="font-poppins">Knowhere, Imaginary</span>
                </div>
              </div>
              <div className='flex space-x-4 text-lg'>
                <a href="#">
                  <IonIcon name="logo-facebook" className="text-[#C5D5EA] text-xl"></IonIcon>
                </a>
                <a href="#">
                  <IonIcon name="logo-twitter" className="text-[#C5D5EA] text-xl"></IonIcon>
                </a>
                <a href="#">
                  <IonIcon name="logo-linkedin" className="text-[#C5D5EA] text-xl"></IonIcon>
                </a>
                <a href="#">
                  <IonIcon name="logo-instagram" className="text-[#C5D5EA] text-xl"></IonIcon>
                </a>
              </div>

            </div>
            <div className="w-full bg-white rounded-xl shadow-lg p-4 md:w-100">
                <iframe className= "w-full flex md:object-cover"src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5448.669243079402!2d106.88904635818373!3d-6.305028624784191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed50d076a261%3A0x73127b9ecf2da0c!2sTaman%20Mini%20Indonesia%20Indah!5e0!3m2!1sen!2sid!4v1685281258056!5m2!1sen!2sid" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

          </div>
        
        </div>
        
          
    </div>
  );
};
