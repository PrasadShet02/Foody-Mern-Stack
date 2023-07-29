import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', location: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert('Enter Valid Credentials');
    }
    else{
      navigate("/login")
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-lg-6 col-md-8'>
          <div className='card shadow-lg bg-dark border-0 rounded-lg mt-5'>
            <div className='card-header'>
              <h3 className='text-center font-weight-light my-4'>Create Account</h3>
            </div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-floating mb-3'>
                  <input className='form-control' id='nameInput' name='name' type='text' placeholder='Name' value={credentials.name} onChange={handleChange} />
                  <label htmlFor='nameInput'>Name</label>
                </div>
                <div className='form-floating mb-3'>
                  <input className='form-control' id='emailInput' name='email' type='email' placeholder='name@example.com' value={credentials.email} onChange={handleChange} />
                  <label htmlFor='emailInput'>Email address</label>
                </div>
                <div className='form-floating mb-3'>
                  <input className='form-control' id='passwordInput' name='password' type='password' placeholder='Password' value={credentials.password} onChange={handleChange} />
                  <label htmlFor='passwordInput'>Password</label>
                </div>
                <div className='form-floating mb-3'>
                  <input className='form-control' id='locationInput' name='location' type='text' placeholder='Address' value={credentials.location} onChange={handleChange} />
                  <label htmlFor='locationInput'>Address</label>
                </div>
                <div className='d-flex align-items-center justify-content-between mt-4 mb-0'>
                  <button className='btn btn-primary' type='submit'>Create Account</button>
                  <Link to='/login' className='btn btn-link'>Already have an account?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}