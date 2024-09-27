import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// Persistence
import { Provider } from 'react-redux'
import { persistor, store } from './Store';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//tailwind css
import './index.css'; 

// Pages
import Home from './pages/home';
import Profile from './pages/profile';
import FAQ from './pages/faq';
import About from './pages/about'
import MealPlans from './pages/mealplans';

// Components present on all pages
import Navbar from './components/navbar';
import Footer from './components/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/faq' element={<FAQ/>}/>
          <Route exact path='/meal plans' element={<MealPlans/>}/>
          <Route exact path='/about' element={<About/>}/>
        </Routes>
        <Footer/>
      </Router>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
