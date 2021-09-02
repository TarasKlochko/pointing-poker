import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import Footer from '../components/footer/Index';
import Header from '../components/header/Index';
import Routing from '../routing/Routing';

function App(): JSX.Element {
  return <div className="App">
    <header className="app-header">
      <Header/>
    </header>
    <main className="app-main">
      <HashRouter>
        <Routing/>
      </HashRouter>
    </main>
    <footer className="app-footer">
      <Footer/>
    </footer>
  </div>;
}

export default App;
