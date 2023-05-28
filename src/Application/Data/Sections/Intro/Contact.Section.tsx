
import IonIcon from '@reacticons/ionicons';
import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

let map;
async function initMap(): Promise<void> {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  // The map, centered at Uluru
  map = new Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 4,
      center: position,
      mapId: 'DEMO_MAP_ID',
    }
  );

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: 'Uluru'
  });
}

export const ContactSection: React.FC = () => {
  return (
    <div className='antialiased bg-gray-100'>
        <div className="flex w-full min-h-screen justify-center items-center">
          <div className="flex flex-col space-y-6 bg-cyan-700 w-full max-w-4xl p-8 rounded-xl shadow-lg text-white">
            <div className="flex flex-col  space-y-8 justify-between">
              <div>
                <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
                <p className="pt-2 text-cyan-100 text-sm">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
              <div className='flex flex-col space-y-6'>
                <div className="inline-flex space-x-2 items-center">
                  <IonIcon name="call" className='text-teal-200 text-xl'></IonIcon>
                  <span>+(123) 456 7890</span>
                </div>
                <div className="inline-flex space-x-2 items-center">
                  <IonIcon name="mail" className='text-teal-200 text-xl'></IonIcon>
                  <span>contact@phasionista.com</span>
                </div>
                <div className="inline-flex space-x-2 items-center">
                  <IonIcon name="location" className='text-teal-200 text-xl'></IonIcon>
                  <span>Knowhere, Imaginary</span>
                </div>
              </div>
              <div className='flex space-x-4 text-lg'>
                <a href="#">
                  <IonIcon name="logo-facebook"></IonIcon>
                </a>
                <a href="#">
                  <IonIcon name="logo-twitter"></IonIcon>
                </a>
                <a href="#">
                  <IonIcon name="logo-linkedin"></IonIcon>
                </a>
                <a href="#">
                  <IonIcon name="logo-instagram"></IonIcon>
                </a>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                initMap();
              </div>

            </div>

          </div>
        
        </div>
        
          
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDpkZvpcSR8ZdEKWYfgsqLKsb1jG-CwJxY")
 })(ContactSection);