import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/auth/authContext';
import AlertContext from '../../contexts/alert/alertContext';

const Login = props => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  }); 

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const onChange = e => setUser({...user, [e.target.name]: e.target.value});

  const { email, password } = user;

  useEffect( ()=>
    {
      if (authContext.isAuthenticated === false) {
        alertContext.addAlert({msg:'Invalid Credential',bg:'bg-red-800'});
      }
      else if (authContext.loading) {
        alertContext.addAlert({msg: 'Loading user...', bg: 'bg-gray-800'});
      }
      else if (authContext.isAuthenticated === true) {
        props.history.push('/');
      }
    }, 
    [ authContext.loading, authContext.isAuthenticated ] 
  );

  const onSubmit = e => {
    e.preventDefault();
    authContext.login(user);
  };

  return (
    <form onSubmit={onSubmit} className='w-full p-4 md:w-1/2 lg:w-1/3 m-auto'>
      <h1 className='text-4xl py-2 text-center'>Account <span className='text-green-900'>Login</span></h1>
      <div className='py-2'>
        <label htmlFor='email' className='py-2 block'>Email</label>
        <input value={email} onChange={onChange} id='email' name='email' type='email' className='block w-full px-2 py-1 border rounded'/>
      </div>
      <div className='py-2'>
        <label htmlFor='password' className='py-2 block'>Password</label>
        <input value={password} onChange={onChange} id='password' name='password' type='text' className='block w-full px-2 py-1 border rounded'/>
      </div>
      <div className='py-4'>
        <input type='submit' value='Login' className='block w-full px-2 py-1 rounded cursor-pointer bg-green-900 text-white'/>
      </div>
    </form>
  );

};

export default Login;
