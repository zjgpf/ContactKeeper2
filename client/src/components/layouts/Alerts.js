import React, { useContext } from 'react';
import AlertContext from '../../contexts/alert/alertContext';

//const alertContext = {
//  showAlert: true,
//  msg: 'Invalid Credential',
//  bg: 'bg-red-800' 
//};

const Alerts = ()=> {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 && alerts.map( alertItem => (
        <div key={alertItem.id} className={`py-2 mb-2 ${alertItem.bg} text-white text-center opacity-75`}>
          {alertItem.msg} 
        </div>
      )
    )
  ); 
}

export default Alerts;
