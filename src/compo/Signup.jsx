import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from '../axios'
import { useStateValue } from '../StateProvider'

function Signup() {
    const [Error, setError] = useState('')
    const history = useHistory()
    const [{basket, user}, dispatch] = useStateValue()
    const [Signup, setSignup] = useState({
        username : '',
        fname : '',
        email : '',
        pass : '',
        repass : '',
    })

    const handleChange = (e)=>{
        let {value,name}  = e.target;

        setSignup((prev)=>{
            return {
                ...prev,
                [name] :value
            }
        })
    }

    const handleSubmit =async (e)=>{
         e.preventDefault();
         if(Signup.pass === Signup.repass){
            const sendData = await axios.post('/auth_api/signup',Signup)
            console.log(sendData);
            if(sendData.data ==='User already exist, try other username')
            setError('User already exist, try other username'); 
            else{
                alert('You are registerd, now enjoy your shopping')
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
        }else{
           setError('Password and confirm password must be same');  
        }

    } 
    return (
        <>
             <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:'80vh'}}>
                <div className="p-5 mt-5"
                    style={{border: '1px solid black', borderRadius: '1rem',minWidth:'360px' }}>
                    <h2 className="text-center mt-3">Sign Up</h2>
                    {Error?(
                        <h3 className="alert-danger">{Error}</h3>
                    ):null}
                    <form onSubmit={handleSubmit} method="POST" className=" form-group">
    
                       <label><p> Username :  </p></label>
                       <input type="text" name="username" className="form-control" autoComplete="off"
                         onChange={handleChange} value={Signup.username}  style={{height: '3.2rem'}} required />
                        <br />
                        <label><p> Name :  </p></label>
                       <input type="text" name="fname" className="form-control" autoComplete="off"
                         onChange={handleChange} value={Signup.fname}  style={{height: '3.2rem'}} required />
                        <br />
                        <label><p> Email :  </p></label>
                       <input type="email" name="email" className="form-control" autoComplete="off"  
                         onChange={handleChange} value={Signup.email}  style={{height: '3.2rem'}} required />
                        <br />
                        <label><p> Password :  </p></label>
                       <input type="password" name="pass" className="form-control" autoComplete="off" 
                         onChange={handleChange} value={Signup.pass}   style={{height: '3.2rem'}} required />
                        <br />
                       <label><p>Re-Enter Password : </p></label>
                       <input type="password" name="repass" className=" form-control"  style={{height: '3.2rem'}}
                         onChange={handleChange} value={Signup.repass}  required />                      
                       <br /><br />
                       <button type="submit" className="w-100 btn" style={{backgroundColor: '#f08040'}} >
                           <p>Signup</p>
                        </button>
                    </form>
                    <h3 className='text-center'>
                        Already have account ? <NavLink to="/login" style={{textDecoration: 'none'}}>login</NavLink>
                    </h3>
                </div>
            </div> 
        </>
    )
}

export default Signup
