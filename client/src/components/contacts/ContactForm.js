import React, { useState, useContext, useEffect } from 'react'; 
import ContactContext from '../../contexts/contact/contactContext';
import AlertContext from '../../contexts/alert/alertContext';

const ContactForm = () => {
  const [contact, setContact] = useState(
    {
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    }
  );
  const { name, email, phone, type } = contact;
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);
  const { current } = contactContext;
  useEffect(()=>{
    if (current) setContact(current);
    else setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  }, [current]);
  const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      contactContext.addContact(contact);
      alertContext.addAlert({msg:'Add contact', bg:'bg-green-800'});
      setContact({name:'',email:'',phone:'',type:'personal'});
    } else {
      contactContext.updateContact(contact);
      alertContext.addAlert({msg:'Edit contact', bg:'bg-blue-800'});
      setContact({name:'',email:'',phone:'',type:'personal'});
    }
  };
  return (
    <form onSubmit={onSubmit} className='w-full my-2 mx-auto lg:w-2/3'>
      <h1 className={`text-center text-2xl ${current===null ? 'text-green-900': 'text-blue-900'} pb-4`}>{current===null?'Add Contact':'Edit Contact'}</h1>
      <div className='py-2'>
        <input required name='name' value={name} onChange={onChange} className='block px-2 py-1 w-full border' placeholder='Name' type='text' />
      </div>
      <div className='py-2'>
        <input required name='email' value={email} onChange={onChange} className='block px-2 py-1 w-full border' placeholder='Email' type='email' />
      </div>
      <div className='py-2'>
        <input required name='phone' value={phone} onChange={onChange} className='block px-2 py-1 w-full border' placeholder='Phone' type='text' />
      </div>
      <div className='py-2'>
        <label className='block py-2'>Contact Type:</label>
        <input type='radio' name='type' value='personal' checked={type==='personal'} onChange={onChange} /> {' Personal  '} 
        <input type='radio' name='type' value='professional' checked={type==='professional'} onChange={onChange} /> {' Professional'} 
      </div>
      <div className='py-2'>
        <input type='submit' className={`block ${current===null ? 'bg-green-900': 'bg-blue-900'} text-white cursor-pointer w-full px-2 py-1 rounded`} value={ current === null ? 'Submit':'Update'}/>
      </div>
    </form>
  );
};

export default ContactForm;
