import React from 'react';
import Routes from './routes';
import './styles.css';

import Header from './componentes/Header';
import Footer from './componentes/Footer';

const App = () => (
    <div className="App">
      <Header/>
      <Routes/>
      <Footer/>


    </div>
)


export default App;
