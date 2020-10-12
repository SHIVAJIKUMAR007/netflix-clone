import React, { useEffect, useState } from "react";
import "../style/mainbody.css";
import img from "../assest/banner.png";
import Product from "./Product";
import axios from "../axios";
import { useStateValue } from "../StateProvider";

function MainBody() {
  const [products, setproducts] = useState([]);
  const [{basket},dispatch ] = useStateValue();
  // console.log('this is basket >>>', basket)

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await axios.get("/api/products");
      const data2 = await data.data;
      setproducts(data2);
    };
    fetchProducts();
  }, []);

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
 
  // console.log('this is basket <<<',basket);

  return (
    <>
      <img
        src={img}
        alt="banner"
        style={{ width: "100%", zIndex: "-1" }}
        className="img-fluid"
        onLoad={setCart}
      />
      <div className="products">
        {products.map((product, i) => (
          <Product
            key={product._id}
            id={product._id}
            width={i < 2 ? 47 : 31}
            title={product.name}
            desc={product.shortDesc}
            image={`${process.env.PUBLIC_URL}/images/${product.image}`}
            className="product"
          />
        ))}
      </div>
    </>
  );
}

export default MainBody;
