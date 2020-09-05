import React, { useContext } from 'react';
import ContactContext from '../../contexts/contact/contactContext';
import AlertContext from '../../contexts/alert/alertContext';
import AuthContext from '../../contexts/auth/authContext';

const ContactItem = ({contact}) => {
  const { _id, name, type, email, phone } = contact; 
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  const onEdit = ()=> {
    contactContext.setCurrent(contact); 
  };
  const onDelete = ()=> {
    contactContext.deleteContact(_id, token);
    alertContext.addAlert({msg:'Delete contact...', bg:'bg-blue-800'});
  };
  return (
    <div className='flex flex-col p-4 my-4 bg-green-100 rounded'>
      <div className='flex justify-between pb-1'> 
        <div>{name}</div>
        <div className={`${type==='personal' ? 'bg-green-900' : 'bg-red-900'} text-white py-1 px-2 rounded`}>
          {type[0].toUpperCase()+type.slice(1)} 
        </div>
      </div>
      <div className='pb-2'>
        <i className='fas fa-envelope-open' />{' '}{email}
      </div>
      <div className='pb-2'>
        <i className='fas fa-phone' />{' '}{phone}
      </div>
      <div className=' flex'>
        <button onClick={onEdit} className='mr-2 py-1 px-2 bg-black text-white rounded'>Edit</button>
        <button onClick={onDelete} className='mx-2 py-1 px-2 bg-red-900 text-white rounded'>Delete</button>
      </div>
    </div>
  );
};

export default ContactItem
