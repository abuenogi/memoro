import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, fas } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { deleteData } from '../fuctions/CRUD';
import { db } from '../services/firebase/firebaseConfig';
//import { memoSelected} from "../context/UserContext";


const MemorenyosActions = ({ memorenyo }) => {

  //Constantes necesarias en el componente
  //const memoSelected = useContext(memoSelected);
   const history = useHistory();

  //Se redirige a la pantalla del formuario de actualización/creación del memoreño
  const onUpdate = value => () => {
    //Se almacena el memoreño seleccionado del listado en el contexto del usuario
    //console.log("onUpdate => memoreño seleccionado y almacenado en el contexto: ",memoSelected);
    console.log("onUpdate => memoreño seleccionado y pasado al componente: ",memorenyo);

    //Se redirige a la página de detalle del memoreño y modificación
    history.push({
      pathname: '/memorenyosForm',
      state: memorenyo.id,
      memorenyo: memorenyo //> Se va a almacenar en el contexto del usuario para evitar problemas de seguirdad ya que puede accederse al location y ver la información del memoreño
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
            db.collection('usuarios').doc(memorenyo.id).delete();
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

      <a className="btn text-primary" onClick={onUpdate()}>
        <FontAwesomeIcon icon={fas, faEdit} />
      </a>
      <a className="btn text-danger" onClick={() => { onDelete() }}>
        <FontAwesomeIcon icon={fas, faTrashAlt} />
      </a>
    </>
  );
}

export default MemorenyosActions; 