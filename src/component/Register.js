import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { auth } from '../firebase';
import { storage } from '../firebase';

const Register = ({ history }) => {
    const [progress, setProgress] = useState(0);
    const [iurl, setIurl] = useState('');
    const hello = (e) => {
        let file = e.target.files[0];
        var storageRef = storage.ref('dp/' + file.name);
                    var task = storageRef.put(file);
                    task.on('state_changed',
                        function progress(snapshot) {
                            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setProgress(percentage);
                        },
                        function error(err) {
                            console.log(err);
                        },
                        function complete(res) {
                            task.snapshot.ref.getDownloadURL().then(
                                function (downloadURL) {
                                    setIurl(downloadURL);
                                    console.log('Set')
                                })
                        })
    }
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        auth
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(cred => {
                if (cred.user) {
                    cred.user.updateProfile({
                        displayName: data.firstName + ' ' + data.lastName,
                        photoURL: iurl
                    })
                        .then(() => {
                            history.push('/dashboard');
                        })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 vw=100 justify-content-center align-items-center'>
            <form className='p-3' onSubmit={handleSubmit(onSubmit)}>
                <div className='col form-group'>
                    <input
                        type='file'
                        placeholder='Choose a file'
                        className='form-control'
                        name='dp'
                        id='image'
                        ref={register()}
                        onChange={hello}
                    />
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='col form-group'>
                        <input
                            type='text'
                            placeholder='First Name'
                            className='form-control'
                            name='firstName'
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className='col form-group'>
                        <input
                            type='text'
                            placeholder='Last Name'
                            className='form-control'
                            name='lastName'
                            ref={register({ required: true })}
                        />
                    </div>
                </div>
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
                    {errors.email && errors.email.message}
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        className='form-control'
                        name='password'
                        ref={register({ required: true })}
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='login' className='ml-3'>Login</Link>
            </form>
        </div>
    )
}
export default withRouter(Register);
