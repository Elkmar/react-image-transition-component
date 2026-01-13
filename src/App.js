import React from 'react';
import './App.css';
import ImageSlider from './Components/ImageSlider/ImageSlider';
import img1 from './imgs/img1.png';
import img2 from './imgs/img2.png';

function App() {
  return (
    <div className="App">
      <ImageSlider beforeImage={img1} afterImage={img2} />
    </div>
  );
}

export default App;
