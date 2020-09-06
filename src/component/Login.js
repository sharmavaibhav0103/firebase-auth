import React from 'react';
import { Link, withRouter } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';

import { auth } from '../firebase'; 

const Login = ({ history }) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        auth
            .signInWithEmailAndPassword(data.email, data.password)
            .then(user => history.push('/dashboard'))
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 vw=100 justify-content-center align-items-center'>
          <form className='vw-50 vh-50 border p-3' onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group'>
                <input
                    type='email'
                    placeholder='Email'
                    className='form-control'
                    name='email'
                    ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address"
                        }
                      })}
                    />
            </div>
            <div className='form-group'>
                <input 
                    type='password'
                    placeholder='Password'
                    className='form-control'
                    name='password'
                    ref={register({
                        required: "Required"
                      })}
                    />
            </div>  
            <button type='submit' className='btn btn-primary'>Submit</button> 
            <Link to='/' className='ml-3'>Register</Link>
          </form>  
        </div>
    )
}
export default withRouter(Login);
