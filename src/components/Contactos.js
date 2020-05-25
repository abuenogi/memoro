
import React, { useState, Fragment , useContext} from "react";
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import  Footer from "./Footer";
import NavigationBar from "../container/CNT_NavigationBar";
import useDropdown from '../fuctions/useDropdown';
import CardMemo from './CardMemo';
import { UserContext } from '../context/UserContext';


const Contactos = () => {


    const user_context = useContext(UserContext);
    const memo_list = ["Ana Bueno", "Tamara Montero", "Mateo"]
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

