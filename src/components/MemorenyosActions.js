import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, fas } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { deleteData } from '../fuctions/CRUD';
import { db } from '../services/firebase/firebaseConfig';


const MemorenyosActions = ({ memorenyo }) => {

  const history = useHistory();


  const onUpdate = value => () => {
    history.push({
      pathname: '/memorenyosForm',
      state: memorenyo.id,
      memorenyo: memorenyo
    });

  }

  //Delete objet
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

      <a className="btn text-primary" onClick={onUpdate(memorenyo)}>
        <FontAwesomeIcon icon={fas, faEdit} />
      </a>
      <a className="btn text-danger" onClick={() => { onDelete(memorenyo) }}>
        <FontAwesomeIcon icon={fas, faTrashAlt} />
      </a>
    </>
  );
}

export default MemorenyosActions; 