import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:4000/api/auth/register", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name, email, password })

        });
        const json = await response.json()
        if (json.success) {
            //save the auth token and rdirect
            localStorage.setItem('token', json.authtoken);
            navigate("/")
            props.showAlert("Account Created Successfully", "success")
        }
        else {
            props.showAlert("invalid credentials ", "danger")
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })

    }

    return (
        <div className='container mt-2'>
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="name" className='mb-2 mt-1'>User Name</label>
                    <input type="text" value={credentials.name} class="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Name" onChange={onChange} />

                </div>
                <div className="form-group">
                    <label for="email" className='my-2'>Email address</label>
                    <input type="email" value={credentials.email} class="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="password" className='my-2'>Password</label>
                    <input type="password" value={credentials.password} className="form-control" id="password" name='password' onChange={onChange} placeholder="Password" />
                </div>
                <div className="form-group">
                    <label for="cpassword" className='my-2'> Confirm Password</label>
                    <input type="password" value={credentials.cpassword} className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary mt-3" >Submit</button>
            </form>
        </div >
    )

}

export default Signup