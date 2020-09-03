import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth/authContext';

const Navbar = ()=> {

  const authContext = useContext(AuthContext);
  const { isAuthenticated, user }  = authContext;

  const div_guest = (
          <div>
            <Link className='text-white px-2' to='/Register'>Register</Link> 
            <Link className='text-white px-2' to='/Login'>Login</Link>
          </div>
        );

  const onLogout = () => {
    authContext.logout();
  };

  let div_user;
  if (isAuthenticated) {
    div_user = (
          <div>
            <span className='text-white px-2'>Welcome {' '} {user.name}</span> 
            <a onClick={onLogout} className='text-white px-2' href='/'><i className='fas fa-sign-out-alt'/>Logout</a>
          </div>
        );
  }

  return (
    <div className='p-4 bg-green-900 text-white flex justify-between items-center'>
      <Link to='/' className='text-2xl'> 
        <i className='fas fa-id-card-alt'/> {' Contact Keeper'}
      </Link>
      <div>
        { isAuthenticated ? div_user : div_guest }
      </div>
    </div>
  ); 

}

export default Navbar;
