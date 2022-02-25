import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventListener, Intro, Svgs } from './Basics';
import { Column, Pie, Dispersion } from './Charts';
import { Fetches } from '@/DataBinding';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route path="/event-listener" element={<EventListener />} />
        <Route path="/svgs" element={<Svgs />} />
        <Route path="/column" element={<Column />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/fetches" element={<Fetches />} />
        <Route path="/dispersion" element={<Dispersion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
