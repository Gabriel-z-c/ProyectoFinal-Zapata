
// src/App.jsx
import React from 'react';
import NavBar from './components/NavBar.jsx';
import ItemListContainer from './components/ItemListContainer';

const App = () => {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting="🌿 Bienvenido a TierraZen — Productos naturales para tu bienestar 🌿" />
    </>
  );
};

export default App;

