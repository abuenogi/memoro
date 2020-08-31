import React, {useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, fas } from '@fortawesome/free-solid-svg-icons'

import { db } from '../services/firebase/firebaseConfig';
import {UserContext} from '../context/UserContext';


const MemorenyosActions = ({ memorenyo}) => {

  //Constantes necesarias en el componente
   const history = useHistory();   
   
   const {memorenyoSelected, setMemorenyoSelected} = useContext(UserContext);
   
   /*
  Se redirige a la pantalla del formuario de actualización/creación del memoreño
  Se procede a almacenar el memoreño seleccionado del listado en el contexto del usuario
  */
  const onUpdate  = () => {
    
    //console.log("Datos del memoreyo a actualizar: ", memorenyo);

    setMemorenyoSelected(memorenyo);
    
    history.push({
      pathname: '/memorenyosForm'
      });

  }

  //Se borran los datos del memoreño, se solicita confirmación para ello, al confirmar 
  //se redirige al listado de memoreños 
  const onDelete = () => {
    console.log("Borrar memorenyo " + memorenyo.id);
    confirmAlert({
      title: 'Borrar memoreñ@',
      message: '¿Realmente quiere eliminar los datos de '+ memorenyo.nombre +'?',
      buttons: [
        {
          label: 'No',
          onClick: () => {}
          
        },
        {
          label: 'Si',
          onClick: () => {
            //Borramos usuario de la bbdd
            db.collection('usuarios').doc(memorenyo.id).delete();
            //Falta que se actualice el listado de memorenyos al borrar el memorenyo
            history.push('/memorenyos');
          }
        }
      ]
    });
    //window.confirm('¿Realmente quiere eliminar el usuario?') ? onConfirm("Aceptar") : onCancel("Cancelar")
    //db.collection('memorenyos').doc(memorenyo.id).delete();
    //{deleteData(memorenyo.id,'usuarios')}
  }

  return (
    <>

      <a className="btn text-primary" onClick={() => { onUpdate() }}>
        <FontAwesomeIcon icon={fas, faEdit} />
      </a>
      <a className="btn text-danger" onClick={() => { onDelete() }}>
        <FontAwesomeIcon icon={fas, faTrashAlt} />
      </a>
    </>
  );
}

export default MemorenyosActions;