import React from 'react'
import { withRouter } from 'react-router-dom';

import MemoContacts from '../components/MemoContacts';


const CNT_MemoContacts = () => {
    const location = useLocation();
    var memorenyo = location.memorenyo;
    console.log('En CNT_MemoContacts memoreño vale: ',memorenyo)

   return (
       <MemoContacts memorenyo={memorenyo}/>       
    );
}

export default withRouter(CNT_MemoContacts); 