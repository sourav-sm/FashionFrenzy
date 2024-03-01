import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'
import Shop from './Pages/Shop';
import Shopcategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import LoggingSignup from './Pages/LoggingSignup';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import NewCollections from './Components/NewCollections/NewCollection';
import Success from './Pages/Success';
import Cancel from './Pages/Cancel';

function App() {
  // const [count, setCount] = useState(0)

  return (
      <div>
        <BrowserRouter>
           <Navbar style={{position:"fixed"}}/>
           <Routes>
              <Route path='/' element={<Shop/>}/>
              <Route path="/new-collections" element={NewCollections} />
              <Route path='/mens' element={<Shopcategory banner={men_banner} category="men"/>}/>
              <Route path='/womens' element={<Shopcategory banner={women_banner} category="women"/>}/>
              <Route path='/kids' element={<Shopcategory banner={kid_banner} category="kid"/>}/>
              <Route path='/product'element={<Product/>}>
                  <Route path=':productId' element={<Product/>}/>
                </Route> 
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/login' element={<LoggingSignup/>}/>
              <Route path='/success' element={<Success/>}/>
              <Route path='/cancel' element={<Cancel/>}/>
           </Routes>
           <Footer/>
        </BrowserRouter> 
      </div>
  )
}

export default App
