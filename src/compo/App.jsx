import React from "react";
import "../style/App.css";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route } from "react-router-dom";
import MainBody from "./MainBody";
import ProductPage from "./ProductPage";
import Cart from "./Cart";
import Error404 from "./Error404";
import Login from "./Login";
import Signup from "./Signup";
import Payment from './Payment'
import Seller from "./Seller";

function App() {
  
  return (
    <div className="App">
      <div className="appBody">
        <header className="App-header">
          <Header  />
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <MainBody />
            </Route>
            <Route exact path="/product/:id">
              <ProductPage />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/payment">
              <Payment />
            </Route>
            <Route exact path="/seller">
              <Seller />
            </Route>
            <Route>
              <Error404 />
            </Route>
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
