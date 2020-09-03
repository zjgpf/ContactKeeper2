import React, { Fragment } from 'react';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';

const Home = ()=> {
  return (
    <div className='m-4 p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <ContactForm /> 
        <Contacts />
      </div>
    </div>
  ); 
};

export default Home;
