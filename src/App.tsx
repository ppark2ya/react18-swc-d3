import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventListener, Intro, Svgs } from './Basics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route path="/event-listener" element={<EventListener />} />
        <Route path="/svgs" element={<Svgs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
