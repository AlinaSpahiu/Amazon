import React from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom"
import HomeScreen from "./components/HomeScreen"
import ProductScreen from "./components/ProductScreen"
import CartScreen from "./components/CartScreen"
import Signin from "./components/Signin"
import Register from "./components/Register"
import Products from "./components/Products"
import Shipping from "./components/Shipping"
import Payment from "./components/Payment"
import PlaceOrder from "./components/PlaceOrder"
import {useSelector} from "react-redux"

function App() {

  const userSignin = useSelector(state =>state.userSignin);
  const {userInfo} = userSignin;

  function openMenu(){
    document.querySelector(".sidebar").classList.toggle("open")
}

  return (
<BrowserRouter>
  <div className="grid-container">
    <header className="header">
       <div className="brand">
           <button onClick={openMenu}> &#9776; </button>
           <Link to="/">Amazona</Link>
       </div>

       <div className="header-links">
          <a href="cart.html">Cart</a>
            {
            userInfo ? <Link to="/profile">{userInfo.name}</Link>
                     : <Link to="/signin">Sign In</Link>
            }
        </div>
     </header>

     <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <ul>
            <li><a href="index.html"> Laptops</a></li>
            <li><a href="index.html"> Smartphones</a></li>
            <li><a href="index.html"> Watches</a></li>
        </ul>    
    </aside>

    <main className="main">
        <div className="content">
          <Route path="/products" component={Products} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/payment" component={Payment} />
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/signin" component={Signin} />
          <Route path="/register" component={Register} />
          <Route path="/products/:id" exact={true} component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
          </div>
    </main>

    <footer className="footer"> All right Reserved </footer>
 </div>
</BrowserRouter>
  );
}

export default App;
