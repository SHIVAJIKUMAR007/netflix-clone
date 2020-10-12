import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../axios'
import { useStateValue } from '../StateProvider'

function OrderForm({gt}) {
    const [{basket},dispatch] = useStateValue()
    const history = useHistory()
    const [Login, setLogin] = useState({
        name : '',
        address : '',
        grandTotle : gt,
        otp : Math.floor(Math.random()*899999) +100000,
        cartItem: JSON.stringify(basket)
    })

    const handleChange = (e)=>{
        let {value,name}  = e.target;

        setLogin((prev)=>{
            return {
                ...prev,
                [name] :value
            }
        })
    }

     // setying updated cart items in basket 
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

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const sendData = await axios.post('/order_api/order',Login)
        console.log(sendData);
        if(sendData.data){
            alert('your order is placed, thanks to use our service')
            window.localStorage.removeItem('cartItem')
           setCart()
           console.log('this is basket >>>', basket)
            // history.push('/')
            window.location ='/';
        }
    }
    
    return (
        <>
           <form id="orderForm" onSubmit={handleSubmit} method="post">
           <label><p>Name :  </p></label>
            <input type="text" name="name" className="form-control" 
               onChange={handleChange}    style={{height: '3.2rem'}} autoComplete="off" required />
           <br />
           <label><p>Address : </p></label>
           <textarea type="text" name="address" rows="5" className=" form-control" 
               onChange={handleChange}  style={{height: '3.2rem'}} required />                      
           <br /><br />
            
            <button type="submit" className="w-100 btn" style={{backgroundColor: '#f08040'}}>
                <p>Place Order with Cash on Delivery</p>
            </button>
            </form> 
        </>
    )
}

export default OrderForm
