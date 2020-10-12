import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "../axios";
import { useStateValue } from "../StateProvider";
import "../style/productPage.css";

function ProductPage() {
  const { id } = useParams();
  const [Product, setProduct] = useState([]);
  const [{basket},dispatch ] = useStateValue();
//  console.log('this is basket >>>' , basket)
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("/api/product/" + id);
      const data2 = await data.data;
      setProduct(data2[0]);
    };
    fetchData();  
  }, [id]);

  // localStorage.clear()
  let itemToInsert = {
    id: Product._id,
    name: Product.name,
    qty: 1,
    image: Product.image,
    price: parseFloat(Product.Price),
    ShortDesc: Product.shortDesc
  };
  const addToCart = () => {
    let cartItem = getCartItem();
    let exist = cartItem.find((x) => x.id === itemToInsert.id);

    if (exist === undefined) {
      // dispatch the item in data layer 
     dispatch({
      type : 'ADD_TO_CART',
      item : itemToInsert
    })
      cartItem = [...cartItem, itemToInsert];
      console.log(cartItem,basket);
      setCartItem(cartItem);
    }
  };

  const getCartItem = () => {
    let cartItem = window.localStorage.getItem("cartItem")
      ? JSON.parse(window.localStorage.getItem("cartItem"))
      : [];
    // console.log(cartItem)
    return cartItem;
  };

  
  // localStorage.clear()

  const setCartItem = (cartItem) => {
    window.localStorage.setItem("cartItem", JSON.stringify(cartItem));
  };


 // setying old cart items in basket 
 const setCart = () =>{
  let cartItem = window.localStorage.getItem("cartItem")
  ? JSON.parse(window.localStorage.getItem("cartItem"))
  : [];
  // empty the basket
  dispatch({
    type : 'EMPTY_THE_BASKET',
    item : 1,
  })
 cartItem.map(items =>{
  //seting the old basket
  dispatch({
    type:'SET_OLD_BASKET',
    item: items,
  })
  return null
 })
}

  return (
    <>
      <NavLink to="/">
        <div className="my-4 btn btn-danger">
          <p>Back</p>
        </div>
      </NavLink>
      <div className=" px-5 row">
        <div className=" order-md-0 order-0 col-md-4 col-12 mt-4">
          <figure id="proImageFig">
            <img
              id="proImagePage"
              className="img-fluid"
              src={`${process.env.PUBLIC_URL}/images/${Product.image}`}
              alt={Product.title}
              onLoad={setCart}
            />
          </figure>
        </div>

        <div className="order-md-1 order-2 col-md-4 col-12 mb-4 mt-4">
          <h3> {Product.name} </h3>
          <h4 className="mt-5">Brand : {Product.brand} </h4>
          <h4>Price : $ {parseFloat(Product.Price)}</h4>
          <div className="mt-5">
            <h2>About This Item</h2>
            <p>{Product.About}</p>
          </div>
        </div>

        <div
          className="order-md-2 order-1 col-md-4 col-12 p-5 mb-4 mt-4"
          style={{
            border: "1px solid black",
            borderRadius: "2rem",
            height: "min-content",
          }}
        >
          <h3>Price : $ {parseFloat(Product.Price)}</h3>
          <p className="alert-success w-75">In Stock</p>
          <NavLink
            id="addToCart"
            onClick={addToCart}
            to='/cart'
            className="w-100 btn text-white mt-3"
            style={{ backgroundColor: "#f08040" }}
          >
            <p>Add To Cart</p>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
