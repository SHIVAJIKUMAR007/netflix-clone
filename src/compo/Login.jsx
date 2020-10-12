import axios from '../axios'
import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useStateValue } from '../StateProvider'

function Login() {
    const [Error, setError] = useState('')
    const history = useHistory()
    const [{basket, user}, dispatch] = useStateValue()
    const [Login, setLogin] = useState({
        username : '',
        pass : ''
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

    const handleSubmit =async (e)=>{
         e.preventDefault();
            const sendData = await axios.post('/auth_api/login',Login)
            console.log(sendData);
            if(sendData.data ==='User did not exist, try other username or signup first'||sendData.data==='Your password is wrong, try other password')
               setError(sendData.data); 
            else{
                alert('You are loginned, enjoy your shopping')
                window.localStorage.setItem('user',JSON.stringify(sendData.data))
                console.log(JSON.parse(window.localStorage.getItem('user')))
                dispatch({
                    type : 'SET_USER',
                    item : sendData.data
                })
                const redirectDicision = window.localStorage.getItem('paymentAfterLogin')
                if(redirectDicision ==='yes'){
                    window.localStorage.removeItem('paymentAfterLogin')
                    history.push('/payment')
                }
                else
                history.push('/');
            }
    } 


    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'80vh'}}>
                <div className="p-5"
                    style={{border: '1px solid black', borderRadius: '1rem',minWidth:'360px' }}>
                    <h2 className="text-center mt-3">Sign In</h2>
                    {Error?(
                        <h3 className="alert-danger">{Error}</h3>
                    ):null}
                    <form onSubmit={handleSubmit}  method="POST" className=" form-group">
    
                       <label><p>Username :  </p></label>
                       <input type="text" name="username" className="form-control" 
                            onChange={handleChange}    style={{height: '3.2rem'}} autoComplete="off" required />
                        <br />
                       <label><p>Password : </p></label>
                       <input type="password" name="pass" className=" form-control" 
                            onChange={handleChange}  style={{height: '3.2rem'}} required />                      
                       <br /><br />
                       <button type="submit" className="w-100 btn" style={{backgroundColor: '#f08040'}} >
                           <p>Login</p> </button>
                    </form>
                    <h3 className='text-center'>new user ? <NavLink to="/signup" style={{textDecoration: 'none'}}>Create New Account</NavLink></h3>

                </div>
            </div> 
        </>
    )
}

export default Login
