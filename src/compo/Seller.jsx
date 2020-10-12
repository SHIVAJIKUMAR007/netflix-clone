import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../axios'
import './index.css'

function Seller() {
const [Orders, setOrders] = useState([])

useEffect(() => {
    const fetchData =async ()=>{
        const orderData = await axios.get('/order_api/order');
        setOrders(orderData.data)
    }
    fetchData()
}, [])

const fetchDataAgain =async ()=>{
    const orderData = await axios.get('/order_api/order');
    setOrders(orderData.data)
}


    return (
        <>
              <h1 className=" my-3 container "> All Pending Orders</h1>
              {
                  Orders?.map((order,i)=>(
                     <EachOrder key={i} i={i} order={order}  fetchDataAgain={fetchDataAgain}/>
                  ))
              }
        </>
    )
}


const EachOrder = ({i,order,fetchDataAgain})=>{
      const [otp, setotp] = useState(null)
      const history = useHistory()

      const handleChange =(e)=>setotp(e.target.value)

      const submitIt= async ()=>{
          const otpData = {id:order._id, otp : otp}
          const sendData =await axios.post('/order_api/checkotp',otpData)
          alert(sendData.data)
          fetchDataAgain()
         window.location='/seller';
         
        }

    return(
        <>
        <h4>{i + 1} )</h4>
        <div className="orderDiv" style={{borderBottom:'1px solid black',marginBottom:'2.5rem',paddingBottom:'1rem'}}>
             <div className="order_header row">
               <div>
                   <p>Ref No : {order._id }</p>
                  <p>Address : { order.address}</p>
              </div>
              <div className="ml-auto">
              <p>Name : {order.name}</p>
              </div>
             </div>
             {
                JSON.parse( order.cartItem)?.map((item,i)=><Item key={i} item={item} />)
             }
             
             <div className="orderFooter">
                  <p>Totle money to take : {order.gt}</p>
                  <form method="post" onSubmit={submitIt}>
                     <input type="number" name="otp" onChange={handleChange} required/>
                     <button type="submit">
                         Check OTP
                     </button>
                  </form>
             </div>
        </div>
     </>
    )
}


const Item =({item})=>{

    return (
        <>
          <div className="row p-4" id='cartItem'>
            <div className="col-md-3 col-3" style={{ backgroundSize: "100% 100%" }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/${item.image}`}
                id="proImage"
                alt={item.name}
              />
            </div>
            <div className=" col-lg-9 col-md-9 col-9 pl-5">
              <div className="row">
                <h3> ${item.name} </h3> <h3 className=" ml-auto"> $ {item.qty * item.price} </h3>
              </div>
              <h4 className="row">
                QTY : {item.qty}
                
              </h4>
            </div>
          </div>
        </>
      );
}

export default Seller;
