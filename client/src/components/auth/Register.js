import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/auth/authContext';
import AlertContext from '../../contexts/alert/alertContext';

const Register = props => {
  const [ user, setUser ] = useState(
    {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  );

  const { name, email, password, password2 } = user;

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { isRegistering, isRegisterSuccess, isAuthenticated, msg, loadUser } = authContext;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(
    ()=> {
      if ( isRegistering ) {
        alertContext.addAlert({msg: 'Registering...', bg: 'bg-gray-800', ms: 300});
      }
      else if ( isRegistering === false ) {
        if ( isRegisterSuccess ) {
          alertContext.addAlert({msg, bg: 'bg-green-800', ms: 1000});
          loadUser();
        } 
        else {
          alertContext.addAlert({msg, bg: 'bg-red-800', ms: 1000});
        }
      }
      if (isAuthenticated) {
        props.history.push('/');
      }
    },
    [ isRegistering, isRegisterSuccess, isAuthenticated ]
  );

  const onSubmit = e=> {
    e.preventDefault();
    if ( password !== password2 ) { 
      alertContext.addAlert({msg: 'Password unmatch', bg: 'bg-red-800', ms: 1000});
    }
    else {
      authContext.register(user);
    }
  };

  return (
    <form onSubmit={onSubmit} className='w-full lg:w-1/3 md:w-1/2 p-4 m-auto'>
      <h1 className='text-4xl py-2 text-center'>Account <span className='text-green-900'>Register</span></h1>
      <div className='py-2'>
        <label htmlFor='name' className='py-2 block'>Name</label>
        <input required onChange={onChange} value={name} id='name' name='name' type='text' className='block w-full px-2 py-1 border rounded'/>
      </div>
      <div className='py-2'>
        <label htmlFor='email' className='py-2 block'>Email</label>
        <input required onChange={onChange} value={email} id='email' name='email' type='email' className='block w-full px-2 py-1 border rounded'/>
      </div>
      <div className='py-2'>
        <label htmlFor='password' className='py-2 block'>Password</label>
        <input required minLength='6' onChange={onChange} value={password} id='password' name='password' type='text' className='block w-full px-2 py-1 border rounded'/>
      </div>
      <div className='py-2'>
        <label htmlFor='password2' className='py-2 block'>Confirm Password</label>
        <input required minLength='6' onChange={onChange} value={password2} id='password2' name='password2' type='text' className='block w-full px-2 py-1 border rounded'/>
      </div>
      <div className='py-4'>
        <input value='Submit' type='submit' className='block w-full px-2 py-1 text-white rounded bg-green-900 cursor-pointer'/>
      </div>
    </form>
  );
};

export default Register;
