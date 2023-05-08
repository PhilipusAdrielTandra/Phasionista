import React, { useState } from 'react';
import Header from "../Components/header"
import Deck from "../Components/deck"
import Footer from "../Components/footer";
import '../Styles/Profile.css'; // import the stylesheet

function Profile(props : any) {
  // initialize the state for the password visibility
  const [showPassword, setShowPassword] = useState(false);

  // handle the password visibility toggle
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <Header/>
      <div className="profile-page">
        <div className="profile-picture-container">
          <img src={props.pictureUrl} alt="Profile Picture" />
        </div>
        <div className="profile-details">
          <div className="name">
            {props.firstName} {props.lastName}
          </div>
          <div className="club-level">
            Club Level
            <div className="slider-container">
              <input type="range" min="0" max="100" value={props.clubLevel} readOnly />
              <div className="badge">{props.clubLevel}%</div>
            </div>
          </div>
          <div className="username">
            Username: {props.username}
          </div>
          <div className="password">
            Password: {showPassword ? props.password : "●●●●●●●●"}
            <button onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="phone-number">
            Phone: {props.phoneNumber}
          </div>
          <div className="email">
            Email: {props.email}
          </div>
        </div>
      </div>
      <Footer/>
      <Deck/>
    </div>
  );
}

export default Profile;
