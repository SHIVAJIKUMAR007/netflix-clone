import React, { useEffect, useState } from "react";
import "../style/header.css";
import logoImg from "../assest/logo2.png";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Header() {
  const [{basket,user },dispatch]=useStateValue()
  const [noOfCartItem, setnoOfCartItem] = useState(0)
  const history = useHistory();
//  console.log('it is user >>.',user)

  const getUser = ()=>{
    const userData = JSON.parse(window.localStorage.getItem('user'))
    dispatch({
      type : 'SET_USER',
      item : userData
    })

    // setying old cart items in basket 
  const setCart = () =>{
    let cartItem = window.localStorage.getItem("cartItem")
    ? JSON.parse(window.localStorage.getItem("cartItem"))
    : [];
    console.log(cartItem)
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
   setCart()
  }

 const findNumOfCartItem = ()=>{
  let numOfItem = 0;
  for (let i = 0; i < basket?.length; i++) {
    if(basket[i]?.qty !== undefined)
    numOfItem += parseInt( basket[i]?.qty)
    // console.log(numOfItem)
    if(i === (basket?.length - 1))
     setnoOfCartItem(numOfItem); 
  }
 }
 useEffect(() => {
  findNumOfCartItem()
 }, [findNumOfCartItem])

 const logout =()=>{
      window.localStorage.removeItem('user');
      dispatch({
        type:'LOGOUT',
        item : {}
      })
      // history.push('/')
      window.location = "/";
 }
 

//  localStorage.clear()

  return (
    <>
      <div className="header" onLoad={getUser} >
        <div>
          <MenuIcon className="MenuIcon" />
        </div>
        <NavLink to='/'>
        <div className="header_logo">
          <img src={logoImg} alt="logo" />
        </div>
        </NavLink>
        <div className="header_searchBox">
          <input type="text" name="search" className="form-control" />
          <SearchIcon className="SearchIcon" />
        </div>
        <div className="navigatonOption row">
          {user?(
           <NavLink to='/profile' id="navlink" style={{color:'#fff'}}  >
           <div className="navigatonOptionMore">
           <p style={{ margin: "0 ", padding: "0" }}>{user.username}</p>
             <p className="font-weight-bold">Account & Lists</p>
           </div>
           </NavLink>
          ):(
            <NavLink to='/login' id="navlink" style={{color:'#fff'}}  >
            <div className="navigatonOptionMore">
              <p style={{ margin: "0 ", padding: "0" }}>Hello, Sign in</p>
              <p className="font-weight-bold">Account & Lists</p>
            </div>
            </NavLink>
          )}
          
          <div className="navigatonOptionMore">
            <p style={{ margin: "0 ", padding: "0" }}> Returns</p>
            <p className="font-weight-bold">& Orders</p>
          </div>
          <div className="navigatonOptionMore">
            <p style={{ margin: "0 ", padding: "0" }}>Try</p>{" "}
            <p className="font-weight-bold">Prime</p>
          </div>
          <NavLink to='/cart' id="navlink" style={{color:'#fff'}} >
             <div className="navigatonOptionMore row">
           
            <ShoppingCartIcon
              style={{ height: "4rem", width: "4rem", marginLeft: "1.5rem" }}
            />
            <div>
              <p id="noOfCartitems" style={{ margin: "0 ", padding: "0" }}>
                {isNaN(noOfCartItem)?0:noOfCartItem}
              </p>
              <p className="font-weight-bold mt-auto">Cart</p>   
               </div>
          </div>
           </NavLink>

           {user?(
          <div className="navigatonOptionMore" onClick={logout} 
             style={{ marginLeft: "2rem",cursor:'pointer' }} >
            <p style={{ margin: "0", padding: "0",fontWeight:'600' }}>Logout</p>
            <ExitToAppIcon style={{ height: "2.9rem", width: "4rem", marginLeft: "1.5rem" }}/>
          </div>
          ):null}

        </div>
      </div>
    </>
  );
}

export default Header;
