
import React, { useState, Fragment , useEffect ,useContext} from "react";
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import  Footer from "./Footer";
import NavigationBar from "../container/CNT_NavigationBar";
import useDropdown from '../fuctions/useDropdown';
import CardMemo from './CardMemo';
import { UserContext } from '../context/UserContext';
import {getDataElement} from '../fuctions/CRUD';


const Contactos = () => {


    const user_context = useContext(UserContext);
    const memo_list = ["Ana Bueno", "Tamara Montero", "Mateo"]

    const email_usu = user_context.email;
    const [contactosID, setContactosID] = useState([]);
    const [contactos, setContactos] = useState([]);
  
    /*
    if (email_usu.rol==='menorenyo'){

         const data_contatos = await getDataElement('usuarios','email',email_usu);
        setContactosID( data_contatos.data().id_cuidador   +   data_contatos.data().ids_contactos ) 
_______________________________________________________________________________________________
         const data_cuidador = await getDataElement('usuarios','id',contactosID[0]);
         setContactos( data_cuidador.data().telefono + nombre + foto );

         const data_contactos = await getDataElement('usuarios','id',contactosID[1 - (contactosID.length -1)]);
         setContactos( data_contactos.data().telefono + nombre + foto);
_______________________________________________________________________________________________ 

    }else if ( (email_usu.rol==='cuidador')) {

         const data_contatos = await getDataElement('usuarios','email',email_usu);
        setContactosID( data_contatos.data().id_memorenyo) 
______________________________________________________________________________________________
        const data_memorenyos = await getDataElement('usuarios','id',contactosID);
         setContactos( data_memorenyos.data().telefono + nombre + foto);
______________________________________________________________________________________________

    }

    const [memo, MemoDropdown] = useDropdown("Contactos", contactos);
    */

    useEffect(() => {
      const fetchData = async () => {
        //ids_contactos
          const data_contatos = await getDataElement('usuarios','email',email_usu);
          setContactos(data_contatos.docs.map(doc => ({ ...doc.data(), id: doc.id })));

        debugger;
        
          //setContactos(data_contatos.data().ids_contactos);
        //id_cuidador
          
      };
      fetchData();

      console.log('Ids contactos', contactos);

    }, [user_context.email]);

    const [memo, MemoDropdown] = useDropdown("Memo", memo_list);
    const enviar_whatsApp = 'https://api.whatsapp.com/send?phone=680980409&text=Llamame%20por%20favor'
    
    

    return (

        <Fragment>
            <NavigationBar />
            <MemoDropdown />
            <CardMemo
            memo={memo}
            />
            <div  className="d-flex justify-content-around mt-4">
            <Button  href="tel://+34680980409" className="button1 mr-3" size="lg">Llamar cuidador</Button>
            <Button href={enviar_whatsApp}  className="button1" size="lg">Enviar WhatsApp</Button>
            </div>   
            <Footer /> 
            </Fragment>
    )

};
export default withRouter(Contactos);

