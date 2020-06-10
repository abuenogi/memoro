
import React, { useState } from "react";


const useDropdown = (label, options) => {
 
  const [valor, setValor] = useState('');

  
  console.log(options);

  const Dropdownmaker = () => (

    <div className="custom_select mb-3 mt-3" >
        <select
        id={label}
        value={valor}
        onChange={e => setValor(e.target.value)}
        onBlur={e=> setValor(e.target.value)}
        disabled={!options.length}
          >
          <option className="select_items">{label}</option>
          {options.map(( value, key )=>
          <option className="select_items" key = {key} value={JSON.stringify(value)}>{value.nombre}</option>)}
        </select>
  </div>
  );
  return [valor, Dropdownmaker, setValor]
  }

  export default useDropdown