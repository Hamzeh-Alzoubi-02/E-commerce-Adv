import { useState } from "react";
import Cart from "./Components/Pages/Cart";
import Home from "./Components/Pages/Home";
import Login from "./Pages/Auth/Login";
import SignUP from "./Pages/Auth/SignUP";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Contact from "./Components/Pages/Contact";
import About from "./Components/Pages/About";

export default function App() {
  const [cart, setCart] = useState([]);
  const [CartDelete, setCartDelete] = useState([]); 
  return (
    <div className="App">
 
 <Router>
            <Routes>
            <Route path="/" element={< SignUP/>}/>
            <Route path="/SignUP" element={<SignUP />} />
            <Route path="/Login" element={<Login />}/>
            <Route path="/Contact" element={<Contact  />}/>
            <Route path="About" element={<About  />}/>
            <Route path="/Home" element={<Home cart={cart} setCart={setCart} setCartDelete={setCartDelete} />} />
            <Route path="/cart" element={<Cart cart={cart}  setCart={setCart}   />} />
            </Routes>
        </Router>
  
       
       </div>
  );
}
 