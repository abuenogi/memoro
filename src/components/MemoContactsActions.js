import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, fas } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { deleteData } from '../fuctions/CRUD';
import { db } from '../services/firebase/firebaseConfig';


const MemoContactsActions = ({contacto}) => {

  const history = useHistory();
  const onUpdate =  () => {

    history.push({
      pathname: '/memoContactsForm',
      contacto: contacto
    });

  }

  //Delete objet
  const onDelete = () => {
    console.log("Borrar contacto " + contacto);
    confirmAlert({
      title: 'Borrar contacto',
      message: '¿Realmente quiere eliminar los datos del contacto? ',
      buttons: [
        {
          label: 'No',
          onClick: () => {}
          
        },
        {
          label: 'Si',
          onClick: () => {
            //Tengo que borrar el contacto del array
            history.push('/memoContacts');
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

      <a className="btn text-primary" onClick={() => { onUpdate(contacto) }}>
        <FontAwesomeIcon icon={fas, faEdit} />
      </a>
      <a className="btn text-danger" onClick={() => { onDelete(contacto) }}>
        <FontAwesomeIcon icon={fas, faTrashAlt} />
      </a>
    </>
  );
}

export default withRouter(MemoContactsActions);