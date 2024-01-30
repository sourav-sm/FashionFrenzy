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

function App() {
  // const [count, setCount] = useState(0)

  return (
      <div>
        <BrowserRouter>
           <Navbar/>
           <Routes>
              <Route path='/' element={<Shop/>}/>
              <Route path='/mens' element={<Shopcategory category="men"/>}/>
              <Route path='/womens' element={<Shopcategory category="women"/>}/>
              <Route path='/kids' element={<Shopcategory category="kid"/>}/>
              <Route path='/product'element={<Product/>}>
                  <Route path=':productId' element={<Product/>}/>
                </Route> 
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/login' element={<LoggingSignup/>}/>
           </Routes>
           <Footer/>
        </BrowserRouter> 
      </div>
  )
}

export default App
