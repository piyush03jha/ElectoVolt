import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Navbar from "./component/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
const [location, setLocation] = useState();
  const [Dropdown, setOpenDropdown] = useState(false);
  
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const {latitude, longitude} = pos.coords
      console.log(latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation);
        setOpenDropdown(false);
        console.log(exactLocation);
        
      } catch (error) {
        console.log(error);
      }
    })
  }
  useEffect(() => {
    getLocation();
  }, [])

  return (
    <BrowserRouter>
    <Navbar location={location} getLocation={getLocation} setOpenDropdown={setOpenDropdown} Dropdown={Dropdown}></Navbar>
      <Routes>
          <Route path="/" element = {<Home />}></Route>
          <Route path="/products" element = {<Product />}></Route>
          <Route path="/about" element = {<About />}></Route>
          <Route path="/contact" element = {<Contact />}></Route>
          <Route path="/cart" element = {<Cart />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;