import React, { useContext, useEffect } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../contexts/contact/contactContext';
import Spinner from '../layouts/Spinner';

const Contacts = ()=> {
  const contactContext = useContext(ContactContext);
  const { contacts, loading, filtedContacts } = contactContext; 
  useEffect( () => {contactContext.getContacts()}, []);
  if (loading) return <Spinner />;
  const onChange = e=> {
    const text = e.target.value.trim();
    contactContext.filter(text);
  };
  return (
    <div className='mx-4'>
      <input onChange={onChange} type='text' placeholder='Filter Contacts...' className='py-1 px-2 block border w-full my-4' />
      {
        contacts.length > 0 ? (filtedContacts === null ? contacts.map( contactItem => <ContactItem key={contactItem._id} contact={contactItem} /> ): filtedContacts.map( contactItem => <ContactItem key={contactItem._id} contact={contactItem} /> )) : (<h3>Please add contacts.</h3>)
      }
    </div>
  );
};

export default Contacts
