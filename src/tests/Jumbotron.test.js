import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Jumbotron from '../components/Jumbotron';
import { renderWithReactRouter } from "../setupTests";


test('loads and displays UserName and image',() => {
  //Se renderiza el componente Jumbotron pasándole un nombre de usuario.
  renderWithReactRouter(<Jumbotron error_position={''} nombre_usuario= {"ANA BUENO"} />)
    //Se comprueba que aparece el nombre de usuario en el componente.
  expect(screen.findByText('ANA BUENO')).not.toBeNull();
})

