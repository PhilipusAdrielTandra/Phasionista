import React from 'react';
import Dashboard from '../Components/Dashboard';
import '../Styles/HomePage.css';

const Home: React.FC = () => {
  return (
    <div className="Home">
      <header>
        <h1>My Website</h1>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="ButtonGroup">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus
          gravida quam, sed rutrum nibh consequat vitae. Suspendisse potenti.
          Donec at vestibulum lacus. Morbi sed quam et sem facilisis suscipit.
        </p>
      </main>
    </div>
  );
}

export default Home;