import React, { useEffect } from 'react';
import Chat from './Chat'; // Import your Chat component
import EthereumBalance from './EthereumBalance'; // Import the EthereumBalance component
import './App.css'; // Import your main CSS file

function App() {
  useEffect(() => {
    // Function to remove the preload class
    const handleLoad = () => {
      document.body.classList.remove('preload');
    };

    // Add event listener for the load event
    window.addEventListener('load', handleLoad);

    // Clean up the event listener
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="chat-container">
        <Chat />
      </div>
      <div className="right-container">
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/QdBZY2fkU-0" // YouTube video URL
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
        {/* Ethereum Balance Component */}
        <EthereumBalance />
      </div>
    </div>
  );
}

export default App;
