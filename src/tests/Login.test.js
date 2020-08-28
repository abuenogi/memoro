import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from '../components/Login'

test('loads and displays login',() => {
  render(<Jumbotron error_position={''} nombre_usuario= {"ANA BUENO"} />)
  //fireEvent.click(screen.getByText('Load Greeting'))
  expect(screen.findByText('ANA BUENO')).not.toBeNull();
})