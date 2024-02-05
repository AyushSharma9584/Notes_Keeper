import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
    const [credentials,setcredentials]=useState({email:"",password:""})
    let navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password })

        });
        const json = await response.json()
        if(json.success){
            //save the auth token and rdirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in Successfully","success")

            navigate("/")

        }
        else{
            props.showAlert("Invalid Details","danger")        }
    }

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})

    }
    return (
        <div className='mt-3'>
            <h2>Login to continue to Notes_Keeper</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="email" className='my-2'>Email address</label>
                    <input type="email" value={credentials.email} class="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="password" className='my-2'>Password</label>
                    <input type="password" value={credentials.password} className="form-control" id="password" name='password' onChange={onChange} placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary my-3" >Submit</button>
            </form>
        </div>
    )
}

export default Login